import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  //adding a new field to the object
  //5xx error are for server errors
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to DB');
    //if we extend a built-in class
    //we have to set this:
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
