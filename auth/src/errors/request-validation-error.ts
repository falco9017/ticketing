import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  //argument inside constructor is the same as
  //having a definition outside and then
  //doing the association inside the constructor
  constructor(public errors: ValidationError[]) {
    super();

    //if we extend a built-in class
    //we have to set this:
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
