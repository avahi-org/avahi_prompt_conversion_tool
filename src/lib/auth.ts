// lib/auth.js
import jwt from 'jsonwebtoken';
import type { NextApiRequest } from 'next';

const SECRET_KEY = 'abcdyhgt6yythr4tbhyy67jnugt5ju7i867ik8gr45uy8i6hryb';

export const verifyToken = (req: NextApiRequest) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error('Invalid token');
  }
};
