/**
 * Preparación de fotos en el navegador.
 *
 * Una foto de móvil ronda los 3-5 MB y el almacenamiento local del navegador
 * anda por los 5 MB en total, así que subirlas tal cual llenaría la cuota con
 * dos fotos. Se redimensionan y comprimen antes de guardarlas.
 */

/** Lado mayor de la imagen resultante. Suficiente para una ficha de equipo. */
const MAX_SIDE = 720;
const QUALITY = 0.82;

/** Tope de entrada: por encima de esto casi seguro es un error del usuario. */
export const MAX_INPUT_BYTES = 12 * 1024 * 1024;

export class ImageError extends Error {}

export async function preparePhoto(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new ImageError("That file is not an image.");
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new ImageError("That image is over 12 MB. Try a smaller one.");
  }

  const dataUrl = await readAsDataUrl(file);
  const img = await loadImage(dataUrl);

  const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new ImageError("Could not process the image.");
  ctx.drawImage(img, 0, 0, w, h);

  return canvas.toDataURL("image/jpeg", QUALITY);
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new ImageError("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    // Safari no decodifica HEIC en canvas, y es el formato por defecto del
    // iPhone: conviene decirlo en vez de fallar sin explicación.
    img.onerror = () =>
      reject(new ImageError("This browser cannot read that image format. JPEG or PNG work everywhere."));
    img.src = src;
  });
}

/** Peso aproximado de un data URL, para avisar antes de llenar la cuota. */
export const dataUrlBytes = (dataUrl: string) =>
  Math.round((dataUrl.length - (dataUrl.indexOf(",") + 1)) * 0.75);
