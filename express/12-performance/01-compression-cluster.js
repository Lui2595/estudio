/**
 * TEMA: Performance — Compression, caching, clustering
 */

const express = require('express');
const compression = require('compression');
const cluster = require('cluster');
const os = require('os');

// ─── Compression ──────────────────────────────────────────
// Comprime responses (gzip/brotli) — reduce bandwidth
const app = express();
app.use(compression());

// ─── Cache headers para recursos estáticos ────────────────
app.use('/static', express.static('public', {
  maxAge: '1d',
  etag: true,
  lastModified: true,
}));

// Cache-Control en API responses
app.get('/api/config', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 min
  res.json({ theme: 'dark', version: '1.0' });
});

// ─── Cluster mode: un proceso por CPU core ───────────────
// Node.js es single-threaded. Cluster aprovecha todos los cores.
if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} forking ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} murió, reiniciando...`);
    cluster.fork();
  });
} else {
  // Workers ejecutan el servidor Express
  // app.listen(PORT);
  // console.log(`Worker ${process.pid} started`);
}

// Producción: PM2 es más práctico que cluster manual
// pm2 start app.js -i max  (un proceso por core)

module.exports = app;
