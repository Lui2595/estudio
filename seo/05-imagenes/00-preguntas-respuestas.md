# Preguntas y Respuestas — SEO de Imágenes

> Review rápido sin código.

---

**P: ¿Por qué importa el atributo alt?**
R: Accesibilidad (lectores de pantalla) + SEO (Google entiende contenido de imagen). Describe la imagen con keyword natural.

---

**P: ¿alt en imagen decorativa?**
R: alt="" vacío. Indica que no aporta información. No omitir el atributo.

---

**P: ¿Formatos de imagen para web?**
R: WebP/AVIF modernos (mejor compresión). JPG fallback. PNG solo si transparencia necesaria.

---

**P: ¿width y height en img?**
R: Evitan CLS (layout shift). Browser reserva espacio antes de cargar imagen. Crítico para Core Web Vitals.

---

**P: loading="lazy" cuándo?**
R: Imágenes below the fold. NO en hero/LCP image (usar fetchpriority="high" en su lugar).

---

**P: ¿Nombre de archivo importa?**
R: Sí, ligeramente. `desarrollo-laravel.webp` mejor que `IMG_2847.jpg`. Keyword descriptiva.

---

**P: Image sitemap?**
R: Sitemap extendido con namespace image. Ayuda Google Images a descubrir imágenes del sitio.
