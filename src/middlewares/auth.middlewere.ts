import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    const { authorization } = req.headers
    if(!authorization){
        res.status(401).json({message: "Unauthorized: token not provided"})
        return
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized: Token missing" });
        return;
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        res.locals.user = decoded;
    
        next();
      } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
        return;
      }
};