"""Letra e íconos propios, recortados a lo que se usa (rendimiento: sin pedir nada a Google ni a jsdelivr).

Crea:
  public/fonts/geist.woff2 y geist-mono.woff2 → letras del sitio, solo con letras del español y signos comunes
  public/fonts/bi.woff2          → Bootstrap Icons solo con los íconos que aparecen en src/
  src/styles/icons.css           → @font-face de todas + clases .bi-* usadas

Correr de nuevo al usar un ícono nuevo:  pnpm fuentes
Necesita: pip install fonttools brotli  ·  pnpm install (bootstrap-icons y @fontsource-variable/geist*)
"""

import json
import sys
import re
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
OUT = ROOT / "public" / "fonts"
NM = ROOT / "node_modules"
OUT.mkdir(parents=True, exist_ok=True)


# Íconos con forma de flecha o triángulo: centrados «a regla» se ven corridos; se empujan un poco (fracción del ancho).
EMPUJE = {"play-fill": 0.05}


def centrar(font: TTFont, nombres: dict[int, str]):
    """Deja cada ícono justo en el centro de su cuadro.

    Al recortar la fuente, el navegador corre cada dibujo hasta pegarlo al borde izquierdo de su cuadro
    (los angostos —play, persona, X, flechas— quedaban hasta un 28 % a la izquierda). Aquí se mueve el dibujo
    al centro y se anota su borde real, para que nadie lo vuelva a correr.
    """
    glyf, hmtx, em = font["glyf"], font["hmtx"], font["head"].unitsPerEm
    alto = font["hhea"].ascent + font["hhea"].descent
    for codigo, nombre in font.getBestCmap().items():
        g = glyf[nombre]
        if g.numberOfContours <= 0:
            continue
        g.recalcBounds(glyf)
        dx = round(em / 2 - (g.xMin + g.xMax) / 2 + EMPUJE.get(nombres.get(codigo, ""), 0) * em)
        dy = round(alto / 2 - (g.yMin + g.yMax) / 2)
        if dx or dy:
            g.coordinates.translate((dx, dy))
            g.recalcBounds(glyf)
        hmtx[nombre] = (hmtx[nombre][0], g.xMin)


def recortar(origen: Path, destino: Path, unicodes: list[int], pesos: tuple[int, int] | None = None, iconos: dict[int, str] | None = None):
    font = TTFont(origen)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["kern", "liga", "calt", "tnum", "lnum"]
    opts.name_IDs = []
    opts.notdef_outline = True
    s = subset.Subsetter(opts)
    s.populate(unicodes=unicodes)
    s.subset(font)
    # Variable: solo el rango de pesos que usa el sitio (después de recortar letras)
    if pesos:
        font = instancer.instantiateVariableFont(font, {"wght": pesos})
    if iconos:
        centrar(font, iconos)
    font.flavor = "woff2"
    font.save(destino)
    return destino.stat().st_size


# ── Íconos: solo los bi-* escritos en el código ──
usados = set()
for f in SRC.rglob("*"):
    if f.suffix in {".astro", ".ts", ".js"}:
        usados |= set(re.findall(r"\bbi-[a-z0-9]+(?:-[a-z0-9]+)*", f.read_text(encoding="utf-8")))
mapa = json.loads((NM / "bootstrap-icons/font/bootstrap-icons.json").read_text(encoding="utf-8"))
iconos = sorted(n for n in usados if n[3:] in mapa)
faltan = sorted(n for n in usados if n[3:] not in mapa)
if faltan:
    print("Ojo, no existen en Bootstrap Icons:", ", ".join(faltan))
peso_bi = recortar(NM / "bootstrap-icons/font/fonts/bootstrap-icons.woff2", OUT / "bi.woff2", [mapa[n[3:]] for n in iconos], iconos={mapa[n[3:]]: n[3:] for n in iconos})

# ── Letras: latín básico + acentos/ñ + signos que se usan (– — · « » … ’ “ ” • € ₱) ──
letras = list(range(0x20, 0x7F)) + list(range(0xA0, 0x100)) + [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026, 0x2212, 0x20AC]
# Letras del sitio: (nombre para el CSS, paquete de fontsource, archivo que se crea, pesos que se usan).
# Para cambiar de letra: instalar su paquete @fontsource-variable/<nombre>, cambiar esta lista y --font-* en project.css.
LETRAS = [
    ("Geist", "geist", "geist.woff2", (400, 700)),
    ("Geist Mono", "geist-mono", "geist-mono.woff2", (400, 600)),
]
pesos_letras = []
for nombre, paquete, archivo, pesos in LETRAS:
    peso = recortar(NM / f"@fontsource-variable/{paquete}/files/{paquete}-latin-wght-normal.woff2", OUT / archivo, letras, pesos)
    pesos_letras.append(f"{archivo} {peso / 1024:.1f} KB")

css = ["/* Generado por scripts/fuentes.py (pnpm fuentes). No editar a mano. */", ""]
for nombre, paquete, archivo, pesos in LETRAS:
    css += [
        "@font-face {",
        f'  font-family: "{nombre}";',
        "  font-style: normal;",
        f"  font-weight: {pesos[0]} {pesos[1]};",
        "  font-display: swap;",
        f'  src: url("/fonts/{archivo}") format("woff2");',
        "}",
        "",
    ]
css += [
    "@font-face {",
    '  font-family: "bootstrap-icons";',
    "  font-display: block;",
    '  src: url("/fonts/bi.woff2") format("woff2");',
    "}",
    "",
    ".bi::before,",
    '[class^="bi-"]::before,',
    '[class*=" bi-"]::before {',
    "  display: inline-block;",
    "  font-family: bootstrap-icons !important;",
    "  font-style: normal;",
    "  font-weight: normal !important;",
    "  font-variant: normal;",
    "  text-transform: none;",
    "  line-height: 1;",
    "  vertical-align: -0.125em;",
    "  -webkit-font-smoothing: antialiased;",
    "  -moz-osx-font-smoothing: grayscale;",
    "}",
    "",
]
css += [f'.{n}::before {{ content: "\\{mapa[n[3:]]:x}"; }}' for n in iconos]
(SRC / "styles" / "icons.css").write_text("\n".join(css) + "\n", encoding="utf-8")

print(f"{len(iconos)} íconos → bi.woff2 {peso_bi / 1024:.1f} KB · " + " · ".join(pesos_letras))
