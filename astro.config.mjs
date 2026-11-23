// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Sitio estático publicado en Netlify.
export default defineConfig({
  site: "https://hccompanysas.com",
  output: "static",
  // Mapa del sitio para Google: sin las páginas internas
  integrations: [sitemap({ filter: (pagina) => !/\.com\/(estilos|mantenimiento)\/$/.test(pagina) })],
  // Los estilos propios de cada página (pocos) viajan dentro de ella: así solo se pide un archivo de estilos, el común
  vite: { build: { target: "es2022", assetsInlineLimit: 16000 } },
});
