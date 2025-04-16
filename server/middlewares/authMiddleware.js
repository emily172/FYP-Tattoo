const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Remove 'Bearer ' from the token if it's present
    const cleanedToken = token.replace('Bearer ', '');
    console.log('Received Token:', cleanedToken); // Log the token for debugging

    // Verify the token using the secret key
    const decoded = jwt.verify(cleanedToken, process.env.JWT_SECRET);
    console.log('Decoded Payload:', decoded); // Log the decoded payload for debugging

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admins only' });
    }

    req.admin = decoded; // Attach admin info to request object
    next();
  } catch (err) {
    console.error('Token Verification Error:', err.message); // Log verification error
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateAdmin;
