import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');

function validationToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const [bearer, token] = req.headers.authorization.split(' ');
  if (bearer !== 'Bearer') {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  const ValidToken = jwt.verify(token, process.env.SECRET ?? 'jwt_secret');
  if (!ValidToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  res.locals.user = ValidToken;
  return next();
}

export default validationToken;
