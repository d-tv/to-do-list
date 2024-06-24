import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import prisma from '../utils/prisma.js';
import {
  validateUserEmail,
  validateUserPassword,
} from '../utils/validation.js';

/**
 * Creates a new user in the system.
 */
export const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!validateUserEmail(email) || !validateUserPassword(password)) {
      return res.status(400).json({ msg: 'Invalid request' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).end();
  } catch (err) {
    next(err);
  }
};

/**
 * Returns a JWT if credentials are correct.
 */
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!validateUserEmail(email) || !validateUserPassword(password)) {
      return res.status(400).json({ msg: 'Invalid request' });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ msg: 'Invalid password' });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
