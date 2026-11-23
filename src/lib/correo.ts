// Ayudas para que el alumno escriba bien su correo (sin depender del navegador).
// limpiarCorreo → siempre minúsculas y sin espacios · revisarCorreo → mensaje claro si algo falta
// sugerirCorreo → «gmial.com» → «gmail.com»

const EJEMPLO = "nombre@gmail.com";

/** « Maria@Gmail.COM » → «maria@gmail.com». */
export const limpiarCorreo = (s: string) => s.replace(/\s+/g, "").toLowerCase();

/** Devuelve el mensaje de error, o "" si el correo está bien escrito. */
export function revisarCorreo(crudo: string): string {
  const correo = limpiarCorreo(crudo);
  if (!correo) return "Escribe tu correo.";
  const partes = correo.split("@");
  if (partes.length === 1) return `Al correo le falta el @. Ejemplo: ${EJEMPLO}`;
  if (partes.length > 2) return "El correo lleva un solo @.";
  const [antes, despues] = partes;
  if (!antes) return `Falta lo que va antes del @. Ejemplo: ${EJEMPLO}`;
  if (!despues) return `Falta lo que va después del @. Ejemplo: ${EJEMPLO}`;
  if (/[^a-z0-9._%+-]/.test(antes) || /[^a-z0-9.-]/.test(despues)) return "El correo no lleva tildes, comas ni la letra ñ.";
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(despues)) return `Falta el final del correo, como «.com». Ejemplo: ${EJEMPLO}`;
  if (antes.startsWith(".") || antes.endsWith(".") || correo.includes("..")) return "Revisa los puntos del correo.";
  return "";
}

// Los más usados por los alumnos: contra estos se comparan los errores de dedo
const CONOCIDOS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com", "hotmail.es", "outlook.es", "yahoo.es", "live.com"];
// Existen de verdad aunque se parezcan a los de arriba: no se corrigen
const VALIDOS = new Set([...CONOCIDOS, "mail.com", "ymail.com", "email.com", "me.com", "msn.com", "aol.com", "gmx.com", "yahoo.com.co", "yahoo.com.mx", "yahoo.com.ar", "live.com.mx", "hotmail.co.uk"]);

/** Cuántas letras hay que cambiar para pasar de una palabra a otra. */
function distancia(a: string, b: string) {
  let fila = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const nueva = [i];
    for (let j = 1; j <= b.length; j++) nueva[j] = Math.min(fila[j] + 1, nueva[j - 1] + 1, fila[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    fila = nueva;
  }
  return fila[b.length];
}

/** Si el final del correo parece un error de dedo, devuelve el correo corregido; si no, "". */
export function sugerirCorreo(crudo: string): string {
  const correo = limpiarCorreo(crudo);
  const [antes, despues, sobra] = correo.split("@");
  if (!antes || !despues || sobra !== undefined || VALIDOS.has(despues)) return "";

  // «.con», «.cmo», «.vom»… → «.com»
  const final = despues.replace(/\.(con|cmo|ocm|vom|xom|comm|coom|cim)$/, ".com");
  if (final !== despues && VALIDOS.has(final)) return `${antes}@${final}`;

  let mejor = "";
  let menor = 3;
  for (const c of CONOCIDOS) {
    const d = distancia(final, c);
    if (d < menor) [mejor, menor] = [c, d];
  }
  if (mejor) return `${antes}@${mejor}`;
  return final !== despues ? `${antes}@${final}` : "";
}
