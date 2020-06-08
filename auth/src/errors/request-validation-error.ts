import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  //argument inside constructor is the same as
  //having a definition outside and then
  //doing the association inside the constructor
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    //if we extend a built-in class
    //we have to set this:
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    //each error is an instance of validationerror
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
