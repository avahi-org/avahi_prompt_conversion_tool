import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = 'abcdyhgt6yythr4tbhyy67jnugt5ju7i867ik8gr45uy8i6hryb';
const USER_NAME = 'AwsAvahiAI';
const PASSWORD = 'AwsAvahiAI@98765';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    if (
      // username === process.env.NEXT_PUBLIC_USER_NAME &&
      // password === process.env.NEXT_PUBLIC_PASSWORD
      username === USER_NAME &&
      password === PASSWORD
    ) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ token });
    }
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
