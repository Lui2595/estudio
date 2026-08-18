/**
 * TEMA: Autenticación JWT
 * ENTREVISTA: ¿JWT en header vs cookie? ¿Cómo refrescar tokens?
 *
 * Access token: corta duración (15min), en Authorization header
 * Refresh token: larga duración (7d), en httpOnly cookie
 */

const jwt = require('jsonwebtoken');
const { AppError } = require('../04-errores/01-async-error-handling');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access-secret-dev';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret-dev';
const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES = '7d';

function generateTokens(user) {
  const payload = { sub: user.id, email: user.email, role: user.role };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
  const refreshToken = jwt.sign({ sub: user.id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });

  return { accessToken, refreshToken };
}

function verifyAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('Token no proporcionado', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, ACCESS_SECRET);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Token expirado', 401));
    }
    next(new AppError('Token inválido', 401));
  }
}

function refreshAccessToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    return jwt.sign(
      { sub: decoded.sub },
      ACCESS_SECRET,
      { expiresIn: ACCESS_EXPIRES }
    );
  } catch {
    throw new AppError('Refresh token inválido', 401);
  }
}

// Login endpoint pattern:
// POST /auth/login → { email, password }
//   → verify credentials
//   → generateTokens(user)
//   → res.cookie('refreshToken', refresh, { httpOnly: true, secure: true, sameSite: 'strict' })
//   → res.json({ accessToken })

// POST /auth/refresh → lee cookie refreshToken → nuevo accessToken

module.exports = { generateTokens, verifyAccessToken, refreshAccessToken };
