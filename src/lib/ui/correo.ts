// Campo de correo (components/ui/EmailInput.astro): mientras escriben pasa todo a minúsculas y quita espacios;
// al salir del campo avisa qué falta o propone la corrección («¿Quisiste decir …@gmail.com?»).
import { limpiarCorreo, revisarCorreo, sugerirCorreo } from "../correo";

const partes = (input: HTMLInputElement) => {
  const campo = input.closest<HTMLElement>("[data-correo]")!;
  return {
    error: campo.querySelector<HTMLElement>("[data-correo-error]")!,
    sugerencia: campo.querySelector<HTMLButtonElement>("[data-correo-sugerencia]")!,
  };
};

/** Revisa el campo y muestra el mensaje. Devuelve true si el correo está bien. */
export function revisarCampoCorreo(input: HTMLInputElement, mensaje = revisarCorreo(input.value)) {
  const { error, sugerencia } = partes(input);
  error.textContent = mensaje;
  error.hidden = !mensaje;
  if (mensaje) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");

  const propuesta = mensaje ? "" : sugerirCorreo(input.value);
  sugerencia.hidden = !propuesta;
  sugerencia.dataset.propuesta = propuesta;
  sugerencia.textContent = propuesta ? `¿Quisiste decir ${propuesta}? Toca aquí para corregirlo` : "";
  return !mensaje;
}

export function initCorreos() {
  document.addEventListener("input", (e) => {
    const input = (e.target as HTMLElement).closest<HTMLInputElement>("[data-correo] input");
    if (!input) return;
    const limpio = limpiarCorreo(input.value);
    if (limpio !== input.value) {
      // El cursor se queda donde iba, aunque se hayan quitado espacios antes de él
      const cursor = limpiarCorreo(input.value.slice(0, input.selectionStart ?? input.value.length)).length;
      input.value = limpio;
      input.setSelectionRange(cursor, cursor);
    }
    // Mientras corrige no se le regaña: el mensaje vuelve al salir del campo
    const { error, sugerencia } = partes(input);
    error.hidden = sugerencia.hidden = true;
    input.removeAttribute("aria-invalid");
  });

  document.addEventListener("focusout", (e) => {
    const input = (e.target as HTMLElement).closest<HTMLInputElement>("[data-correo] input");
    if (input?.value) revisarCampoCorreo(input);
  });

  document.addEventListener("click", (e) => {
    const boton = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-correo-sugerencia]");
    if (!boton) return;
    const input = boton.closest("[data-correo]")!.querySelector<HTMLInputElement>("input")!;
    input.value = boton.dataset.propuesta || input.value;
    revisarCampoCorreo(input);
    input.focus();
  });
}
