const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Fix: Split using space, not an empty string
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message:
        'Access denied, token was not provided. Please log in to continue.',
    });
  }

  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedTokenInfo);
    req.userInfo = decodedTokenInfo;
    next();
  } catch (e) {
    return res.status(403).json({
      success: false,
      message: 'Invalid token. Please log in again.',
    });
  }
};

module.exports = authMiddleware;
