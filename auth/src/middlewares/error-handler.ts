//to be an express error middleware
//has to be a single function with argument err, req, res, next
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

//we want a common error object structure as output:
//an object with a param errors which is an array of objects
// {
//   errors: {
//     message: string,
//     field?: string
//   }[]
// }

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check the instance of error to structure the response
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  res.status(400).send({
    errors: [{ message: err.message }],
  });
};
