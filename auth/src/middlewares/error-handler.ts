//to be an express error middleware
//has to be a single function with argument err, req, res, next
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

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
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
    return res.status(400).send({ errors: formattedErrors });
  }
  if (err instanceof DatabaseConnectionError) {
    //5xx error are for server errors
    return res.status(500).send({ errors: { message: err.reason } });
  }
  res.status(400).send({
    errors: [{ message: err.message }],
  });
};
