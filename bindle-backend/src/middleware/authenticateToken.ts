import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

// ✅ Don't redeclare the Request interface — use the global one and cast it
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403);

    // ✅ Inject the full decoded user, cast as Prisma User
    (req as Request & { user: User }).user = decoded;

    next();
  });
};

export default authenticateToken;
