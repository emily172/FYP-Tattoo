const jwt = require('jsonwebtoken');

const authorizeRole = (role) => (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== role) return res.status(403).json({ error: 'Forbidden: Access denied' });
    req.userId = decoded.id; // Attach user ID to the request
    req.userRole = decoded.role; // Attach user role to the request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authorizeRole;
