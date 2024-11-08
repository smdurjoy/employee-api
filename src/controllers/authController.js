const jwt = require('jsonwebtoken');

const generateToken = (req, res) => {
  const payload = { userId: 1 }; 
  const secretKey = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { generateToken };
