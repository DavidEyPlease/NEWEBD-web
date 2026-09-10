# CloverLeaf — Certification ERP (demo)

Demo navegable del ERP propuesto a CloverleafAWS. Es el destino de los botones
de la propuesta en [newebd.com/cloverleaf](https://newebd.com/cloverleaf), igual
que `/vegemex` abre `panel.vegemex.com.mx`.

**En vivo:** https://cloverleaf-erp.newebd.com

## Qué es y qué no es

- **Datos de muestra**, no reales. Viven en `lib/data.ts` y están cruzados entre
  sí: los certificados corresponden a sus auditorías, los hallazgos a sus
  instalaciones, y cada auditor solo aparece en especies para las que está
  calificado. Una barra permanente lo advierte en pantalla.
- **Sin backend.** Es un export estático de Next.js, así que se sirve desde un
  subdominio cPanel sin proceso Node detrás y no hay nada que se pueda caer.

## Pantallas

Dashboard · Leads & CRM · Clients & Facilities · Audits (con detalle de cada
auditoría) · Findings & CAPA · Certificates · Public Registry · Auditor
Competence · Site Feedback.

## Site Feedback

El módulo donde el cliente revisa su web: elige una página, arrastra un
rectángulo sobre la zona que quiere comentar y escribe una nota. El recorte de
esa zona se genera en el navegador con canvas y se adjunta como JPEG.

Los campos que guarda (`pageUrl`, `viewport`, `region`, `thumb`) siguen el
modelo de anotaciones de `newebd-platform`, para que encajen al conectar el
backend real. Hoy las notas viven en `localStorage` y se exportan a JSON.

## Desarrollo

```bash
npm install
npm run dev
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
rsync -az --delete --exclude cgi-bin --exclude .well-known --exclude .htaccess \
  -e ssh out/ newebd-vps:/home/wwvpsm/cloverleaf-erp.newebd.com/
```

El `.htaccess` del subdominio (cache de `/_next/static/`, `noindex`) se gestiona
en el servidor y por eso queda excluido del rsync.
