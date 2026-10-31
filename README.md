# Tecnicam: web para un servicio técnico de cámaras

Rediseño de la web de [Tecnicam](https://tecnicam.es), un taller de reparación y mantenimiento de cámaras fotográficas y de vídeo profesionales en Tenerife (4,9★ y más de 400 reseñas en Google).

La web anterior estaba hecha con un creador de páginas, tenía secciones vacías y ningún sistema de cita. El objetivo era que el negocio **pareciera más profesional y moderno**, que **conseguir cita por WhatsApp fuera inmediato** y que la web estuviera **preparada para posicionarse en Google** a nivel local.

## Qué incluye

- **Portada a pantalla completa** con un guiño a la fotografía: esquinas de visor y un efecto de "enfoque" al cargar la página.
- **Carrusel de reseñas reales** de Google justo debajo de la portada. Se pausa al pasar el ratón o al tocarlo, y no se mueve si el usuario tiene activado "reducir movimiento".
- **Formulario de cita sin servidor**: recoge equipo, avería y franja horaria, y abre WhatsApp con el mensaje ya redactado. No guarda datos.
- **SEO local**:
  - datos estructurados `LocalBusiness` y `FAQPage`;
  - título y descripción optimizados;
  - `sitemap.xml` y `robots.txt`;
  - redirecciones 301 desde las direcciones de la web antigua para no perder posicionamiento.
- **Rendimiento**: HTML, CSS y JavaScript sin frameworks, tipografía alojada en la propia web (sin Google Fonts ni cookies) e imágenes optimizadas (la web completa pesa unos 2 MB).
- **Accesibilidad**: buen contraste, foco visible al navegar con teclado, enlace para saltar al contenido y diseño adaptado al móvil.

## Tecnología

HTML + CSS + JavaScript, sin dependencias. Tipografía [Archivo](https://fonts.google.com/specimen/Archivo) (variable). Publicada en Netlify.

```
web/
├── index.html         Página principal
├── privacidad.html    Política de privacidad
├── css/styles.css
├── js/main.js         Menú móvil, carrusel y formulario → WhatsApp
├── fonts/             Archivo (woff2)
├── img/               Fotos del taller optimizadas
├── _redirects         Redirecciones 301 (Netlify)
├── robots.txt
└── sitemap.xml
```

## Verla en local

```bash
python -m http.server 5500 --directory web
```

Y abre http://localhost:5500.

---

Diseño y desarrollo: [mariomig837](https://github.com/mariomig837) · ZunZunLabs
