# CLAUDE.md

Sitio de HC Company S.A.S (hccompanysas.com): mantenimiento de equipos de laboratorio, Cali. Hecho sobre la plantilla base de MacV. Solo Astro. Se publica en Netlify.

**Trato:** el sitio le habla al visitante de «usted» (Contáctenos, sus equipos). Mantenerlo.

**No tocar sin avisar:** las direcciones de las páginas (`/servicios/...`, `/planeta_hogar/`), los títulos y descripciones de cada página y `verificacionGoogle` en `cliente.ts`: de eso depende cómo sale el sitio en Google.

## Comandos

```bash
pnpm dev        # localhost:4321
pnpm build      # estático a dist/
pnpm preview    # ver el build
pnpm check      # revisar errores
pnpm fuentes    # al usar un ícono bi-* nuevo (recorta letra e íconos; necesita Python con fonttools y brotli)
```

Vista previa: `.claude/launch.json` → `hc` (puerto 4330).

## Dónde está todo

```
src/
├── data/cliente.ts        ← textos y datos del inicio, contacto, menú y ficha de Google
├── styles/                ← project.css (valores y colores) · global.css (piezas) · icons.css (generado)
├── layouts/Layout1.astro  ← único layout
├── components/            ← base-head, header, navbar, tema, whatsapp, titulo-seccion
│   ├── portada-interna.astro  ← cabecera de las páginas internas
│   ├── bloque-foto.astro · lista-columnas.astro · tarjetas-foto.astro  ← con esto se arman las páginas de servicio
│   └── ui/                ← Select, DatePicker, Modal, Menu, PasswordInput, EmailInput
├── lib/ui/                ← comportamiento de las piezas
├── sections/              ← hero, cifras, servicios, nosotros, marcas, llamada, contacto, footer
└── pages/                 ← index, servicios/{mantenimiento,automatizacion,calificacion}, planeta_hogar, 404, mantenimiento, estilos
scripts/fuentes.py         ← recorta letra e íconos a lo que se usa → public/fonts/
public/_headers            ← seguridad y caché en Netlify
```

El mapa del sitio lo arma `@astrojs/sitemap` (`sitemap-index.xml`, el que conoce Google). `public/robots.txt` apunta a él.

`/estilos` — muestrario con todas las piezas y valores (no sale en el menú ni en buscadores). **Pieza nueva = se agrega ahí.**

## Piezas (clases de `global.css`)

- Botones: `.btn` + `.btn-primary / -accent / -ghost / -subtle / -danger` + `.btn-sm / -lg / -icon / -block`. Ocupado: `aria-busy="true"` + `<span class="spinner">`.
- Campos: `.field` > `label` + `.input` / `.textarea` + `.hint` / `.error-text`. Varios en fila: `.form-grid` (+ `.span-2`).
- `.check`, `.switch`, `.segmented`, `.filter-chips`, `.tabs` + `.tab`.
- `.card`, `.cells` (una tarjeta partida en celdas), `.icon-box`, `.badge`, `.callout`, `.empty`.
- Utilidades: `.flex-row`, `.flex-column`, `.bg-grid`, `.bg-dots`, `.eyebrow`, `.mono`, `.muted`, `.small`, `.link`, `.tnum`, `.wrap`, `.sr-only`, `.reveal`, `.sin-scroll`.
- Con comportamiento: `window.ui.alert / confirm / confirmTyped / toast / openModal / closeModal`; abrir ventana desde HTML con `data-modal-open="id"` y cerrar con `data-modal-close`; texto flotante con `data-tip="…"`.
- `lib/ui/index.ts` pide cada pieza solo si la página la usa. No volver a importarlas todas de entrada.

## Colores y tema

`project.css` en 3 niveles: 1 primitivos (únicos con valores crudos) → 2 semánticos por tema → 3 componente.

- Los componentes usan nivel 2 o 3 (`--clr-surface`, `--clr-text`, `--card-border`…), **nunca un primitivo** (`--gray-200`): no cambiaría con el tema.
- Mezclas de color: `color-mix(in srgb, …)`. Con `oklch` los grises salen teñidos.
- Tema: sigue al equipo por defecto; el botón guarda la elección (`window.__theme`). Todo se revisa en claro y en oscuro.
- El porqué de cada decisión: `DESIGN_SYSTEM.md`.

## Reglas CSS obligatorias (skills: css-order, astro-css-architecture)

Orden en cada selector: base → `@media (hover: hover)` (nunca `:hover` fuera) → `@media (min-width: 750px)` (mobile-first).

- `global.css` → reset, utilidades y piezas · `project.css` → valores · `<style>` del `.astro` → estilos del componente.
- Nunca `style=""` en etiquetas. Nunca colores ni medidas escritos a mano: solo tokens.
- Lo que se arma en el navegador (`innerHTML`, `createElement`) o llega ya armado (texto de un artículo) no recibe los estilos del `<style>` del componente: usar `:global(...)` bajo un padre propio o `<style is:global>`.
- Al pasar el mouse la tarjeta se queda quieta (ni sube ni crece): solo borde y sombra, o se mueve la imagen de adentro.
- Movimiento solo con CSS. Aparecer al bajar = clase `.reveal`.

## Reglas de interfaz

- Nunca `alert()` / `confirm()` / `prompt()` del navegador: `window.ui.*`.
- Nunca `<select>` ni `<input type="date">` del navegador: `Select.astro` y `DatePicker.astro`.
- Correo siempre con `EmailInput.astro`; contraseña con `PasswordInput.astro`.
- Textos y errores para el usuario: español simple, de «tú», sin nada técnico.
- Regla 60·30·10: el color de vida (`--clr-accent` de fondo, `--clr-accent-text` como texto) solo va donde se quiere un clic o un detalle pequeño. Un solo botón destacado por bloque.
- Cuidar detalles: alineación, anchos iguales, separaciones parejas. Revisar con captura (claro, oscuro, celular) antes de dar por terminado.
- Nada privado dentro de `public/` (todo lo de ahí es público).

## Assets

Logo: `public/img/logo.avif` (engranaje, fondo transparente: cabecera y pie) y `logo.jpg` (ficha de Google). Íconos de pestaña en `public/`. `og.jpg` 1200×630 = imagen al compartir el enlace. Fotos en `.avif`. Las fotos de equipos y diagramas hechos sobre blanco llevan fondo `--img-clara-bg` (blanco en los dos temas).

Letra (Geist para títulos y lectura, Geist Mono para etiquetas) e íconos (Bootstrap Icons) van dentro del sitio, sin pedir nada a Google ni a otro servidor. Cambiar de letra: lista `LETRAS` en `scripts/fuentes.py` + `--font-*` en `project.css`. Íconos: en contorno por defecto; `-fill` solo dentro de un `.icon-box`.

## Estilo (resumen; el detalle en `DESIGN_SYSTEM.md`)

Minimalista, compacto y sobrio. Títulos en minúsculas con letras juntas; etiquetas en letra de máquina; líneas finas en vez de cajas; mucho blanco. Cada sección empieza con `titulo-seccion.astro` (línea + número automático + título a la izquierda y texto a la derecha). Contenido alineado a la izquierda, no centrado.

## Pendiente

- Rediseño hecho en la rama `rediseno` (2026-11-23). Falta que el cliente lo apruebe antes de pasarlo a `main` y publicar.
- La foto de la página de calificación se pide a otro servidor (lirp.cdn-website.com): conviene pedirle el original al cliente y guardarlo en `public/img/`.
- Tienda, reporte y zona de clientes se quitaron (están en el historial de git, commit 885bd03).
