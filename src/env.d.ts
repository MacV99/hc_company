/// <reference types="astro/client" />

interface Window {
  /** Tema del sitio (lo define el script de base-head.astro). */
  __theme: {
    get: () => "system" | "light" | "dark";
    set: (value: "system" | "light" | "dark") => void;
  };
}
