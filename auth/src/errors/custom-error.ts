export abstract class CustomError extends Error {
  //every child needs to have statusCode
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  //every child needs to implement serializeErrors
  //which returns an array of object with message and field
  abstract serializeErrors(): { message: string; field?: string }[];
}
