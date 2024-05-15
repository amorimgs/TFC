import { Request, Response, NextFunction } from 'express';

function validationEmailAndPassord(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return res.status(401).json({ message: 'Invalid email or password' });
  if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });
  return next();
}

export default validationEmailAndPassord;
