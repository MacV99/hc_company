// Mensaje de error debajo de un campo: <input name="x"> + <span class="error-text" data-error="x" hidden>.
// Devuelve true si el campo quedó bien (mensaje vacío).
export function marcar(form: HTMLElement, nombre: string, mensaje: string) {
  const texto = form.querySelector<HTMLElement>(`[data-error="${nombre}"]`);
  const campo = form.querySelector<HTMLElement>(`[name="${nombre}"]`);
  if (texto) {
    texto.textContent = mensaje;
    texto.hidden = !mensaje;
  }
  if (mensaje) campo?.setAttribute("aria-invalid", "true");
  else campo?.removeAttribute("aria-invalid");
  return !mensaje;
}

/** Botón ocupado mientras se guarda (no deja tocarlo dos veces). */
export function ocupado(boton: HTMLButtonElement, si: boolean) {
  boton.disabled = si;
  boton.setAttribute("aria-busy", String(si));
}
