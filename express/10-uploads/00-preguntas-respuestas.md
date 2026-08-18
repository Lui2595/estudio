# Preguntas y Respuestas — Uploads Express

> Review rápido sin código.

---

**P: ¿Qué hace Multer?**
R: Middleware para multipart/form-data (file uploads). single(), array(), fields() según cantidad de archivos.

---

**P: ¿Validar uploads?**
R: MIME type, extensión, tamaño máximo. No confiar solo en extensión — verificar magic bytes.

---

**P: ¿Almacenar en disco vs S3?**
R: Disco local solo dev/small apps. Producción: S3/Cloudinary con multer-s3. Nunca public/ con nombres originales.

---

**P: ¿Nombre de archivo seguro?**
R: UUID/random + extensión validada. Nunca usar nombre original del usuario (path traversal, overwrite).

---

**P: memoryStorage vs diskStorage?**
R: Memory: buffer en RAM, límite estricto. Disk: escribe temporal. S3: stream directo preferido en producción.

---

**P: ¿Límite tamaño upload?**
R: Multer limits.fileSize + express.json limit + Nginx client_max_body_size. Capas de protección.
