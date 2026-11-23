// Datos de HC Company. Todos los textos del sitio salen de aquí (y de las páginas de cada servicio).
// Para APAGAR una sección del inicio: dejar su lista vacía ([]) o su texto vacío (""). La sección desaparece sola.

const whatsapp = "573136536775"; // número con indicativo, sin "+" ni espacios
const mensajeWhatsapp = "Hola quiero información"; // mensaje que ya sale escrito al abrir WhatsApp

type Encabezado = { etiqueta?: string; titulo: string; texto?: string };

export const cliente = {
  // ───────── Lo básico ─────────
  nombre: "HC Company",
  // Renglón pequeño bajo el nombre, en la cabecera
  lema: "Desde 1997",
  // Portada: etiqueta pequeña, frase grande y texto de apoyo
  etiqueta: "Cali, Colombia · Desde 1997",
  titular: "Alargamos la vida útil de sus equipos.",
  descripcion:
    "HC Company S.A.S ofrece mantenimiento preventivo, correctivo y predictivo de equipos de laboratorio en Colombia. Servicio integral, profesional y a nivel nacional.",
  url: "https://hccompanysas.com", // dominio final, sin "/" al final
  imagenCompartir: "/img/og.jpg", // 1200×630, se ve al compartir el enlace

  // ───────── Contacto ─────────
  telefono: "+57 313 653 6775",
  // Segundo teléfono y segundo correo (vacío = no se muestra)
  telefonoTecnico: "+57 317 441 5108",
  whatsapp: `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensajeWhatsapp)}`,
  correo: "comercial@hccompanysas.com",
  correoAdministrativo: "diradmin@hccompanysas.com",
  direccion: "",
  ubicacion: "Cali, Colombia · Servicio a nivel nacional",
  ciudad: "Cali",
  region: "Valle del Cauca",
  pais: "CO", // dos letras
  // Enlace «Insertar un mapa» de Google Maps (solo la dirección que va en src="…"). Vacío = sin mapa.
  mapa: "",
  horario: [
    { dia: "Lunes a viernes · mañana", horas: "8:00 am – 12:00 m" },
    { dia: "Lunes a viernes · tarde", horas: "2:00 pm – 5:00 pm" },
    { dia: "Sábados, domingos y festivos", horas: "Cerrado" },
  ],

  // ───────── Menú ─────────
  // `icono` solo se usa si el menú del celular va en barra abajo.
  menu: [
    { texto: "Inicio", url: "/", icono: "bi-house" },
    { texto: "Servicios", url: "/#servicios", icono: "bi-grid" },
    { texto: "Planeta Hogar", url: "/planeta_hogar/", icono: "bi-globe-americas" },
    { texto: "Contacto", url: "/#contacto", icono: "bi-chat-dots" },
  ],
  // Celular: true = menú en una barra abajo (como una app) · false = botón que abre el menú a pantalla completa
  menuEnBarra: false,
  // Botón flotante de WhatsApp en todas las páginas
  whatsappFlotante: true,

  redes: [
    { nombre: "WhatsApp", icono: "bi-whatsapp", url: `https://wa.me/${whatsapp}` },
    { nombre: "Instagram", icono: "bi-instagram", url: "https://www.instagram.com/hccompanysas/" },
    { nombre: "Facebook", icono: "bi-facebook", url: "https://www.facebook.com/Comercialhccompanysas/" },
  ],

  // ───────── Secciones del inicio ─────────
  caracteristicas: ["Mantenimiento", "Automatización y restauración", "Calificación IQ · OQ · PQ", "Servicio a nivel nacional"],

  // `contar: true` = el número sube contando al aparecer en pantalla
  cifras: [
    { numero: "+5.900", texto: "Equipos intervenidos", contar: true },
    { numero: "1997", texto: "Desde" },
    { numero: "Nacional", texto: "Cobertura del servicio" },
  ] as { numero: string; texto: string; contar?: boolean }[],

  servicios: {
    encabezado: { etiqueta: "Lo que hacemos", titulo: "Nuestros servicios", texto: "Tres líneas de servicio para equipos de laboratorio." } as Encabezado,
    // `url` lleva a la página del servicio. `imagen` (ruta en /public) reemplaza al ícono.
    lista: [
      {
        icono: "bi-tools",
        titulo: "Mantenimiento preventivo, correctivo y predictivo",
        texto: "Balanzas, autoclaves, cabinas, hornos, muflas, centrífugas, microscopios y más.",
        imagen: "/img/servicios/mantenimiento.avif",
        url: "/servicios/mantenimiento/",
      },
      {
        icono: "bi-gear",
        titulo: "Automatización, restauración, adaptación, fábrica y asesoría",
        texto: "Para equipos valorados como obsoletos o inservibles, y para mobiliario y equipo a la medida.",
        imagen: "/img/servicios/automatizacion.avif",
        url: "/servicios/automatizacion/",
      },
      {
        icono: "bi-patch-check",
        titulo: "Calificación IQ · OQ · PQ",
        texto: "Instalación, funcionamiento y rendimiento del equipo, verificados y documentados.",
        imagen: "/img/servicios/calificacion.avif",
        url: "/servicios/calificacion/",
      },
    ] as { icono: string; titulo: string; texto: string; imagen?: string; url?: string }[],
  },

  nosotros: {
    encabezado: { etiqueta: "Quiénes somos", titulo: "Servicio especializado para equipos de laboratorio" } as Encabezado,
    // Cada renglón es un párrafo
    texto: [
      "Nuestros esfuerzos están encaminados a satisfacer las necesidades de mantenimiento preventivo, correctivo, predictivo, ajuste y calificación y a alargar la vida útil de los equipos.",
      "Contamos con experiencia, conocimiento y recurso físico y humano, que nos permiten ofrecer un servicio integral, profesional y empático con los requerimientos e intereses de nuestros clientes.",
    ],
    imagen: "/img/hero.avif",
    puntos: [] as string[],
  },

  marcas: {
    encabezado: { etiqueta: "Experiencia", titulo: "Marcas que atendemos" } as Encabezado,
    // `logo` es opcional (ruta en /public). Sin logo se muestra el nombre.
    lista: [
      { nombre: "Hanna Instruments" },
      { nombre: "Hach" },
      { nombre: "Ohaus" },
      { nombre: "Labconco" },
      { nombre: "Brand" },
      { nombre: "Büchi" },
      { nombre: "Schott Duran" },
      { nombre: "Corning" },
      { nombre: "Memmert" },
      { nombre: "WTW" },
    ] as { nombre: string; logo?: string }[],
  },

  llamada: {
    titulo: "¿Hablamos de sus equipos?",
    texto: "Cuéntenos qué necesita y le respondemos.",
    boton: "Contáctenos por WhatsApp",
  },

  contacto: {
    encabezado: { etiqueta: "Estamos para servirle", titulo: "Contacto", texto: "Escríbanos o llámenos. Prestamos servicio a nivel nacional." } as Encabezado,
  },

  // ───────── Para Google ─────────
  tipoNegocio: "LocalBusiness",
  // Código de Google Search Console (no borrar: con él Google reconoce el sitio)
  verificacionGoogle: "KGYVKdZliJu0IQiDsaJ8-7Mf5u28haRxVKDYztpaDa8",
  descripcionGoogle:
    "Empresa especializada en mantenimiento preventivo, correctivo y predictivo de equipos de laboratorio, automatización, restauración y calificación IQ-OQ-PQ en Colombia.",
  coordenadas: { latitud: "3.4516", longitud: "-76.5319" },
  // Horario en el formato que pide Google
  horarioGoogle: [
    { abre: "08:00", cierra: "12:00" },
    { abre: "14:00", cierra: "17:00" },
  ],
  // Contador de visitas (sin cookies): null = apagado · "vercel" · { goatcounter: "micodigo" }
  analitica: null as null | "vercel" | { goatcounter: string },

  legal: {
    razonSocial: "HC Company S.A.S",
  },
};
