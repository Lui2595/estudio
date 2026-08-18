/**
 * TEMA: File Upload con Multer
 * Validar tipo, tamaño y almacenamiento seguro.
 */

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Almacenamiento en disco con nombre seguro
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Filtro de tipos permitidos
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 3,
  },
});

// Uso en rutas:
// router.post('/avatar', upload.single('avatar'), (req, res) => {
//   res.json({ filename: req.file.filename, size: req.file.size });
// });

// router.post('/gallery', upload.array('photos', 5), (req, res) => {
//   res.json({ files: req.files.map(f => f.filename) });
// });

// Producción: subir a S3/Cloudinary, no disco local
// npm install @aws-sdk/client-s3 multer-s3

module.exports = upload;
