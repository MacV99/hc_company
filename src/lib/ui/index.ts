// Piezas con comportamiento. Se carga una vez en Layout1.
// Rendimiento: cada pieza se pide SOLO si la página la usa (una página sin listas ni fechas no baja ese código),
// y las ventanas y avisos se piden la primera vez que se llaman. `window.ui` siempre está disponible.
import { initTabs } from "./tabs";
import { initPasswordToggles } from "./password";
import { initNumericInputs } from "./numeric";

type Dialogs = typeof import("./dialogs");
type Toasts = typeof import("./toast");

const hay = (selector: string) => document.querySelector(selector) !== null;
const definir = (nombre: string, clase: CustomElementConstructor) => customElements.get(nombre) || customElements.define(nombre, clase);

if (hay("ds-select")) import("./select").then((m) => definir("ds-select", m.DsSelect));
if (hay("ds-date")) import("./date").then((m) => definir("ds-date", m.DsDate));
if (hay("ds-menu")) import("./menu").then((m) => definir("ds-menu", m.DsMenu));
if (hay("[data-tip]")) import("./tooltip").then((m) => m.initTooltips());
if (hay("[data-password-toggle]")) initPasswordToggles();
if (hay("[data-correo]")) import("./correo").then((m) => m.initCorreos());
if (hay("[role='tablist']")) initTabs();
if (hay("input[inputmode='numeric'], input[type='number']")) initNumericInputs();

const dialogs = () => import("./dialogs");
const toasts = () => import("./toast");

const openModal = (id: string) => (document.getElementById(id) as HTMLDialogElement | null)?.showModal();
const closeModal = (id: string) => (document.getElementById(id) as HTMLDialogElement | null)?.close();

// Abrir y cerrar ventanas desde el HTML: <button data-modal-open="id"> / <button data-modal-close>
if (hay("dialog, [data-modal-open]"))
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const opener = target.closest<HTMLElement>("[data-modal-open]");
    if (opener) openModal(opener.dataset.modalOpen!);
    target.closest("[data-modal-close]")?.closest("dialog")?.close();
  });

// Tocar afuera de una ventana la cierra (igual que Esc: en las de confirmar cuenta como «Cancelar»)
document.addEventListener("click", (e) => {
  const ventana = e.target as HTMLElement;
  if (!(ventana instanceof HTMLDialogElement) || !ventana.matches(".modal")) return;
  const r = ventana.getBoundingClientRect();
  const adentro = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  if (adentro) return;
  if (ventana.dispatchEvent(new Event("cancel", { cancelable: true }))) ventana.close();
});

export const ui = {
  alert: (...a: Parameters<Dialogs["alert"]>) => dialogs().then((m) => m.alert(...a)),
  confirm: (...a: Parameters<Dialogs["confirm"]>) => dialogs().then((m) => m.confirm(...a)),
  confirmTyped: (...a: Parameters<Dialogs["confirmTyped"]>) => dialogs().then((m) => m.confirmTyped(...a)),
  toast: (...a: Parameters<Toasts["toast"]>) => void toasts().then((m) => m.toast(...a)),
  toastAction: (...a: Parameters<Toasts["toastAction"]>) => void toasts().then((m) => m.toastAction(...a)),
  flash: (...a: Parameters<Toasts["flash"]>) => void toasts().then((m) => m.flash(...a)),
  openModal,
  closeModal,
};

declare global {
  interface Window {
    ui: typeof ui;
  }
}

window.ui = ui;

// Aviso guardado para mostrarse en esta página (lib/ui/toast.ts → flash)
try {
  if (sessionStorage.getItem("flash")) toasts().then((m) => m.showFlash());
} catch {}
