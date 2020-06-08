import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

//apply a validator as middleware to check if the res is correct
router.post(
  '/api/users/signup',
  //adding a middleware as second argument
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  //typescript type validation
  (req: Request, res: Response) => {
    //validationResults return an object with specified messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    console.log('Creating a user');
    throw new DatabaseConnectionError();
    res.send({ ciao: 'ciao' });
  }
);

export { router as signupRouter };
