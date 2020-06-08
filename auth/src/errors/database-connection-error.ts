export class DatabaseConnectionError extends Error {
  //adding a new field to the object
  reason = 'Error connecting to database';

  constructor() {
    super();
    //if we extend a built-in class
    //we have to set this:
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
