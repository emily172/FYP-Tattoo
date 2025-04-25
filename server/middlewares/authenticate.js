const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']; // Get token from headers
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const cleanedToken = token.replace('Bearer ', ''); // Clean up "Bearer " prefix if present
    const decoded = jwt.verify(cleanedToken, process.env.JWT_SECRET); // Verify JWT token
    req.userId = decoded.id; // Attach user ID from the token
    req.userRole = decoded.role; // Attach user role from the token
    next(); // Pass control to the next middleware
  } catch (err) {
    console.error('Token Verification Error:', err.message); // Log error for debugging
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticate;
