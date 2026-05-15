# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # dev server → localhost:4321
pnpm build     # production build → ./dist/
pnpm preview   # preview production build
```

No lint or test scripts configured.

## Architecture

Astro 5 site. File-based routing — each `src/pages/*.astro` is a route.

**Layout flow:** `Layout1.astro` wraps every page — imports `global.css`, renders `<Header />`, `<slot />`, `<Footer />`.

**Folder roles:**
- `src/sections/` — full-width page sections (Header, Footer, Hero, Shop…). Not reused across pages.
- `src/components/` — reusable pieces (navbar, product_card, loader…).
- `src/styles/global.css` — CSS variables, reset, utility classes only.

## CSS Rules

Global vars defined in `global.css` under `:root`: `--clr-*`, `--transition`, `--font1`.

Utility classes in `global.css`:
- `.flex-row` — `display:flex; flex-direction:row; align-items:center; justify-content:center`
- `.flex-column` — same but `flex-direction:column`
- `.boton` / `.button1` / `.button2` — button variants

Component-specific styles go in scoped `<style>` blocks inside each `.astro` file. Use `is:global` only when JS manipulates classes at runtime.

Breakpoint: `@media (min-width: 768px)` for desktop. Hover states inside `@media (hover: hover)`.

## Icons & Fonts

Bootstrap Icons via CDN (loaded in Layout1.astro). Use `<i class="bi bi-*">`.
Font: Montserrat (Google Fonts, loaded in Layout1.astro).
