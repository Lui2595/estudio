/**
 * ENTREVISTA VOZ: "How would you structure JWT auth in a Node API?"
 *
 * Responde en voz (inglés):
 * - Access token: short-lived, sent in Authorization header
 * - Refresh token: httpOnly cookie, rotated on use
 * - Middleware verifies JWT before protected routes
 */

const jwt = require('jsonwebtoken');

// --- Middleware: authenticate ---
function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }

  const token = header.slice(7);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// --- Login: issue tokens ---
function loginHandler(req, res) {
  const { email, password } = req.body;
  const user = validateUser(email, password); // your DB lookup
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const accessToken = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { sub: user.id, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // httpOnly cookie — not accessible from JS (XSS protection)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, user: { id: user.id, email: user.email } });
}

// --- Refresh: rotate tokens ---
async function refreshHandler(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: 'No refresh token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    // Senior: invalidate old refresh in DB (rotation)
    const newAccess = jwt.sign(
      { sub: payload.sub },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ accessToken: newAccess });
  } catch {
    res.status(401).json({ error: 'Refresh expired' });
  }
}

// --- Protected route example ---
// app.get('/api/me', authenticate, (req, res) => res.json(req.user));

function validateUser(email, password) {
  return { id: 1, email, role: 'user' }; // placeholder
}

module.exports = { authenticate, loginHandler, refreshHandler };
