const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  // Demo affordance: in the sandbox/demo environment (no token yet, e.g.
  // right after cloning before login is wired up in the UI) fall back to a
  // fixed demo user so every route stays exercisable end to end.
  if (!token && process.env.NODE_ENV !== 'production') {
    req.user = { sub: 'demo-user', email: 'demo@katha.app' };
    return next();
  }

  if (!token) {
    return res.status(401).json({ error: 'Missing bearer token.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

module.exports = { requireAuth };
