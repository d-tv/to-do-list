import jwt from 'jsonwebtoken';
import config from '../config/index.js';

/**
 * Verifies a JWT and saves decoded data for further usage.
 */
const verifyToken = (req, res, next) => {
  const auth = req.header('Authorization');

  if (!auth) return res.status(401).json({ msg: 'Unauthorized request' });

  const parts = auth.split(' ');
  if (parts.length != 2) {
    return res.status(401).json({ msg: 'Unauthorized request' });
  }
  const token = parts[1];

  if (!token) return res.status(401).json({ msg: 'Unauthorized request' });

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Unauthorized request' });
  }
};

export default verifyToken;
