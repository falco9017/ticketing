//middleware that extracts information from jwt payload
//on whether the user is logged in or not
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//this part is to tell ts that the type Request can
//optionally have a field of type UserPayload
interface UserPayload {
  id: string;
  email: string;
}

//this is to access Request type definition
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //!req.session?.jwt is equivalent to
  //!req.session || !req.session.jwt
  if (!req.session?.jwt) {
    return next();
  }
  //verify if jwt has been modified
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
