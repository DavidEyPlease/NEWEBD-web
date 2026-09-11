# CloverLeaf — Admin

El admin de CloverleafAWS. Dos partes son reales y están conectadas a su web
(**Site Feedback** y **Our Team**); el resto es la vista previa navegable del
ERP propuesto en [newebd.com/cloverleaf](https://newebd.com/cloverleaf), con
datos de muestra.

**En vivo:** https://admin.cloverleafaws.com (y, mientras llega su certificado,
https://cloverleaf-erp.newebd.com, que sirve lo mismo).

## Acceso

Hace falta sesión para entrar. Las cuentas se crean en el servidor con la CLI
de `cloverleaf-api`, que da un código de un solo uso (7 días); la persona entra
con su usuario, escribe el código y elige su propia contraseña. Nadie más la
conoce.

```bash
# en el VPS, como wwvpsm, dentro de /home/wwvpsm/cloverleaf-api
runuser -u wwvpsm -- node dist/cli.js user:create <usuario> "<Nombre visible>"
runuser -u wwvpsm -- node dist/cli.js user:reset <usuario>   # olvidó la contraseña
```

Enlace de invitación con todo precargado:
`https://admin.cloverleafaws.com/login/#u=<usuario>&c=<CODIGO>`. El código va en
el fragmento (`#`), que el navegador nunca envía al servidor.

## Qué es y qué no es

- **Datos de muestra**, no reales. Viven en `lib/data.ts` y están cruzados entre
  sí: los certificados corresponden a sus auditorías, los hallazgos a sus
  instalaciones, y cada auditor solo aparece en especies para las que está
  calificado. Una barra permanente lo advierte en pantalla.
- **Export estático** de Next.js servido por Apache. Lo editable habla con la
  API (`cloverleaf-api`, NestJS en PM2) en `/api` del mismo dominio: Apache la
  pasa a `127.0.0.1:3010`, así que la cookie de sesión viaja sola y no hay CORS.

## Pantallas

Dashboard · Leads & CRM · Clients & Facilities · Audits (con detalle de cada
auditoría) · Findings & CAPA · Certificates · Public Registry · Auditor
Competence · Directory · Roles & Access · Workload · **Site Feedback** ·
**Our Team** · Social Media. En el menú, además, la propuesta y la cotización.

## Site Feedback

El módulo donde el cliente revisa su web: elige una página, arrastra un
rectángulo sobre la zona que quiere comentar y escribe una nota. El recorte de
esa zona se genera en el navegador con canvas y se adjunta como JPEG.

Los campos que guarda (`pageUrl`, `viewport`, `region`, `thumb`) siguen el
modelo de anotaciones de `newebd-platform`. Las notas se guardan en la API en
cuanto se envían; el recorte solo se sirve con sesión. Para verlas desde el
servidor: `node dist/cli.js feedback:list`.

## Our Team

Lo que se edita aquí es lo que muestra About Us en cloverleafaws.com: la web
lee `GET /api/public/team` (solo lo publicado, en orden). Los cambios se
guardan solos y se ven en la web en menos de un minuto.

## Desarrollo

```bash
npm install
npm run dev     # hace proxy de /api a la API local (API_DEV_URL, por defecto 127.0.0.1:3099)
```

## Regenerar las capturas del sitio

Cuando cambie cloverleaf.newebd.com:

```bash
node scripts/capture-site.mjs
```

Usa el Chromium que Playwright ya tiene en caché (no descarga nada). Si está en
otra ruta, pásala con `CHROMIUM_PATH=...`.

## Despliegue

```bash
npm run build            # genera out/
for d in admin.cloverleafaws.com cloverleaf-erp.newebd.com; do
  rsync -az --delete --exclude cgi-bin --exclude .well-known --exclude .htaccess \
    -e ssh out/ newebd-vps:/home/wwvpsm/$d/
done
```

El `.htaccess` de cada dominio (proxy de `/api`, caché de `/_next/static/`,
`noindex`, cabeceras) se gestiona en el servidor y por eso queda excluido del
rsync.
