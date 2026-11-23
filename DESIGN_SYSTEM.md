# Plantilla Base MacV — Sistema de Diseño

> Plantilla neutra de MacV. No hay marca propia: es el punto de partida que cada cliente re-marca.
> **Fuente de verdad de valores:** `src/styles/project.css`. Este doc explica el **porqué**; nunca copia hex ni px.
> **Referencia viva:** la página `/estilos` muestra cada valor y pieza funcionando. Si algo no está ahí, no existe todavía.

---

## 1. Personalidad
Minimalista · compacta · sobria · elegante · profesional. Sensación: una marca que no necesita gritar.
**Referencia:** página de producto de una empresa de tecnología seria: mucho blanco, letra firme, líneas finas.
**Anti-referencia:** plantilla genérica con todo centrado, títulos en mayúsculas espaciadas, degradados, sombras por todos lados y tarjetas que saltan.

## 2. Principios
1. **Escala de grises por defecto.** La jerarquía sale de tamaño, peso y espacio, no del color.
2. **Líneas finas en vez de cajas.** Una línea de 1 px separa secciones, cifras y preguntas. Tarjeta solo cuando el contenido es una unidad (servicio, plan, opinión).
3. **Alineado a la izquierda.** Título a la izquierda y texto a la derecha en computador. Centrado solo en páginas de un solo mensaje (error, mantenimiento).
4. **Títulos en minúsculas, con las letras juntas** y peso medio-fuerte. Nada en mayúsculas salvo las etiquetas.
5. **Etiquetas en letra de máquina**, pequeñas y en mayúsculas: dan el tono técnico y ordenado.
6. **Regla 60 · 30 · 10.** 60 % fondo (blanco o casi negro), 30 % tinta (texto, bordes, botón oscuro) y 10 % color de vida. **El color de vida es el único que puede pedir un clic**: botón principal de cada bloque, botón flotante, número de sección, punto de la portada y pequeños detalles (chulos, comillas, la «×» de una pregunta abierta). Nunca en fondos grandes, íconos de tarjeta ni títulos. Los colores de estado (éxito · aviso · peligro) solo comunican estado.
7. **Compacto.** Controles bajos, esquinas discretas, cabecera de poco alto. El aire va entre secciones, no dentro de las piezas.
8. **Nada se mueve porque sí.** La tarjeta se queda quieta al pasar el mouse; solo cambian borde y sombra, o se mueve la imagen de adentro.
9. **Todo sigue el tema.** Ningún bloque queda oscuro en tema claro (ni el pie ni la llamada).

## 3. Firma gráfica (lo que se mantiene al re-marcar)
- **Secciones numeradas solas** (`01`, `02`…) en la etiqueta de cada título. Las cuenta el navegador: al mover o apagar una sección se renumeran.
- **Cuadrícula tenue** que se desvanece, detrás de la portada y de la llamada (`.bg-grid`).
- **Cabecera flotante**, baja y translúcida.
- **El nombre en grande** al fondo del pie, casi invisible y cortado por el borde.

## 4. Valores en 3 niveles y temas
| Nivel | Qué es | Regla |
|-------|--------|-------|
| 1 · Primitivos | Marca (`--brand-*`, `--accent-*`), grises `--gray-0…950`, estados, espaciado, esquinas, letra, medidas, capas | Únicos con valores crudos |
| 2 · Semánticos | Rol en la interfaz: `--clr-bg`, `--clr-surface*`, `--clr-text*`, `--clr-primary`, `--clr-accent`, `--clr-{success,warning,danger}[-bg]`, sombras, `--focus-ring` | Solo `var()` de nivel 1. Uno por tema (claro y oscuro) |
| 3 · Componente | `--header-*`, `--card-*`, `--btn-radius`, `--grid-line`, `--input-*`, `--popover-*`, `--modal-*`, `--footer-*`, `--tabbar-*`, `--page-pad`, `--section-*` | Solo `var()` de nivel 2 |

- **Re-marcar = tocar solo el bloque MARCA del nivel 1** (6 valores). Tinta: `--brand-600` (fondo claro) y `--brand-300` (fondo oscuro). Color de vida: `--accent-600` (fondo del botón, igual en los dos temas, con texto oscuro encima), `--accent-700` (como texto sobre claro) , `--accent-300` (como texto sobre oscuro) y `--accent-on` (texto encima del botón).
- El color de vida tiene dos papeles: `--clr-accent` (fondos) y `--clr-accent-text` (texto e íconos). Usar el de fondo como texto sobre blanco no se lee bien.
- Un componente **nunca** usa un primitivo directamente: no cambiaría con el tema.
- Mezclas con `color-mix(in srgb, …)`. Con `oklch` los grises pierden el tono y salen teñidos de rojo.
- **Temas:** `system` (por defecto) · `light` · `dark`. El script de `base-head.astro` escribe `data-theme` en `<html>` antes del primer pintado (sin parpadeo) y guarda la elección en el navegador.
- Fondo claro = blanco puro; las superficies se distinguen por el borde, no por un gris de fondo.
- Excepciones de valor escrito a mano: el color de la barra del navegador en `base-head.astro` (igual a `--gray-0` / `--gray-950`; sincronizar a mano) y el negro de la máscara de `.bg-grid` (no es un color: marca qué parte se ve).

## 5. Tipografía
- **Geist** (títulos y lectura) + **Geist Mono** (etiquetas, fechas, horarios). Dentro del sitio (`public/fonts/`, recortadas por `scripts/fuentes.py`); pesan unos 30 KB entre las dos.
- Tres papeles en tokens: `--font-display`, `--font-sans`, `--font-mono`. Una marca con más carácter cambia solo `--font-display`.
- Escala `--text-xs … 4xl`. `4xl` = titular de la portada; `3xl` = título de sección; `lg` = texto destacado.
- Títulos: peso 600, `--tracking-tight`. Etiquetas: `.eyebrow` (mono, mayúsculas, `--tracking-caps`).
- `--text-input` (16 px) en campos: evita que el celular acerque la pantalla al escribir.

## 6. Espaciado, esquinas, sombras
- Espaciado solo `--space-1…9` (4·8·12·16·24·32·48·64·96). Entre secciones: `--section-pad` (más en computador).
- Ancho de página `--page-max`; ancho de lectura `--text-max`.
- Esquinas discretas: `sm` controles pequeños · `md` botones y campos · `lg` tarjetas, cabecera y bloques · `pill` solo etiquetas, puntos y el botón flotante.
- Sombras casi ausentes: `sm` al pasar el mouse · `md` plan destacado · `lg` lo que flota (ventanas, avisos, WhatsApp).
- Altura de control: `--control-h` (40 px) y `--control-h-sm` (32 px).

## 7. Contratos de componente
| Componente | Clase / archivo | Regla |
| ---------- | --------------- | ----- |
| Título de sección | `components/titulo-seccion.astro` | Línea fina + número + etiqueta + título + texto. **Toda sección empieza así** |
| Botones | `.btn` + `-primary / -accent / -ghost / -subtle / -danger` + `-sm / -lg / -icon / -block` | Esquina `--btn-radius`. **Un solo `-accent` por bloque**; el resto `-ghost` o `-subtle` |
| Campo | `.field` > `label` + `.input` / `.textarea` + `.hint` / `.error-text` | Error: `aria-invalid="true"`. Foco con borde + `--focus-ring` |
| Lista desplegable | `ui/Select.astro` → `<ds-select>` | **Nunca `<select>` del navegador.** `searchable` para listas largas, `creatable` para dejar crear |
| Fecha | `ui/DatePicker.astro` → `<ds-date>` | **Nunca `<input type="date">`** |
| Correo / contraseña | `ui/EmailInput.astro` · `ui/PasswordInput.astro` | El correo corrige errores de dedo; la contraseña trae el ojo |
| Ventana | `ui/Modal.astro` · `window.ui.alert / confirm` | **Nunca las del navegador.** En celular sale desde abajo. `tone: "danger"` para lo que no se puede deshacer |
| Aviso corto | `window.ui.toast` | Confirmación leve que no pide acción («Guardado») |
| Menú de acciones | `ui/Menu.astro` → `<ds-menu>` | Acciones secundarias; las peligrosas al final, tras separador |
| Etiquetas | `.badge` · `.callout` · `.empty` | El color solo comunica estado |
| Opciones | `.check` · `.switch` · `.segmented` · `.filter-chips` · `.tabs` | Segmented: 2–4 opciones cortas |
| Cabecera | `components/header.astro` | Flotante, `--header-h`. El desenfoque va en una capa aparte (`::before`): puesto en la cabecera atraparía el menú del celular |
| Menú del celular | `components/navbar.astro` | Pantalla completa con enlaces grandes y numerados, o barra abajo con `cliente.menuEnBarra` (reserva su alto en `--tabbar-h`) |
| Portada | `sections/hero.astro` | Etiqueta con punto vivo + titular `4xl` + texto + 2 botones + características en una línea. Entra escalonada |
| Cifras | `sections/cifras.astro` | Franja entre dos líneas, sin tarjeta |
| Tarjeta | `.card` + `--card-*` | Borde `--card-border` → `--card-border-hover` + `--shadow-sm`. No se mueve |
| Celdas | `.cells` | Una sola tarjeta partida (ventajas, misión y visión) |
| Cuadro de ícono | `.icon-box` (+ `.lg`) | Único lugar para íconos rellenos (`-fill`) |
| Llamada | `sections/llamada.astro` | Bloque suave (`--clr-primary-bg`) con cuadrícula; sigue el tema. Botón con el color de vida |
| WhatsApp flotante | `components/whatsapp.astro` | Abre con el mensaje ya escrito. Se esconde con el menú abierto. Se apaga en `cliente.ts` |
| Pie | `sections/footer.astro` | `--footer-*` (sigue el tema): marca + 3 columnas + línea legal + firma |
| Aparecer al bajar | `.reveal` | Solo CSS; donde no se soporta, el contenido queda quieto |

**Secciones:** cada una lee sus datos de `cliente.ts` y no se pinta si están vacíos. Ninguna lleva textos del cliente escritos adentro.

## 8. Accesibilidad (mínimo AA)
- Texto secundario (`--clr-text-2`) pasa AA sobre el fondo en los dos temas. Los bordes no se usan como texto.
- `:focus-visible` global con `--focus-ring`. Enlace «Ir al contenido» al usar el teclado.
- `prefers-reduced-motion` apaga animaciones, transiciones y desplazamiento suave.

## 9. Hacer / evitar
**Hacer:** re-marcar tocando solo MARCA; revisar en claro, oscuro y celular; agregar cada pieza nueva a `/estilos`; empezar cada sección con el título de sección.
**Evitar:** centrar secciones, títulos en mayúsculas, color de vida por toda la interfaz, cajas dentro de cajas, valores escritos a mano fuera de `project.css`, primitivos dentro de componentes, `style=""`, esquinas o sombras fuera de escala «solo esta vez».

---

## Changelog
- `2026-08-19` — Creación del documento. Identidad neutra, contratos y jerarquía 70/20/10. Escala de espaciado y esquinas a tokens. Foco visible y movimiento reducido.
- `2026-10-07` — Paleta por defecto pasa a escala de grises minimalista.
- `2026-11-23` — **Cimientos nuevos** (traídos del portal y el inventario de JDT): valores en 3 niveles, tema claro/oscuro, escala de letra, medidas y capas. Se eliminan los `--rgb-*` gemelos (se desincronizaron una vez): todo se deriva con `color-mix`. Letra e íconos dentro del sitio. Página `/estilos`. Astro 5 → 7.
- `2026-11-23` — **Piezas y secciones** (traídas del portal JDT, Friosystem, Angie, Gym Parra y Wear): sistema `.btn` reemplaza a `.button1 / .button2`; campos, lista desplegable, calendario, ventanas, avisos, etiquetas, pestañas y filtros. Secciones nuevas: cifras, nosotros, ventajas, galería, precios, opiniones, marcas, artículos, preguntas, llamada y contacto. WhatsApp flotante, menú del celular en barra (opcional), páginas de datos, error y mantenimiento, ficha para Google y mapa del sitio.
- `2026-11-23` — **Rediseño completo** (pedido del usuario: moderno, limpio, compacto, minimalista, elegante). Montserrat → Geist + Geist Mono. Títulos dejan las mayúsculas espaciadas: minúsculas con letras juntas. Todo pasa de centrado a alineado a la izquierda. Fondo blanco puro y líneas finas en vez de cajas. Botones de pastilla a esquina discreta. Cabecera más baja con botón «Escríbenos». Portada nueva con titular propio (`cliente.titular`) y las características adentro (se elimina `caracteristicas.astro`). Pie en columnas. Firma nueva: secciones numeradas, cuadrícula tenue y nombre gigante en el pie; el fondo de puntos deja de ser firma (queda como utilidad).
- `2026-11-23` — **Color de vida naranja** (pedido del usuario, siguiendo la regla 60 · 30 · 10): antes el acento era la misma tinta. Ahora `--accent-600` con texto oscuro encima, y dos tonos para usarlo como texto. Íconos de tarjeta pasan a tinta para no gastar el acento. Preguntas frecuentes: título y lista en la misma fila (antes quedaba un hueco a la izquierda). Pie: marca a un lado y columnas que se acomodan solas. Rejillas de tarjetas bajan a 200 px de mínimo para que en tableta no quede una tarjeta suelta.
- `2026-11-23` — **Color de vida: verde lima** (elegido por el usuario entre naranja, azul cobalto, lima, turquesa y rosa). Nuevo `--accent-on`: el texto que va encima del botón, para que cada marca decida si es oscuro o blanco. La llamada «¿Hablamos?» deja de ser negra en tema claro (el usuario lo vio como un error): ahora sigue el tema.
- `2026-11-23` — El pie deja de ser negro en tema claro (pedido del usuario, igual que la llamada): ahora sigue el tema. Se eliminan `--clr-inverse` / `--clr-on-inverse`.
