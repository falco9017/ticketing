import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

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
  async (req: Request, res: Response) => {
    //validationResults return an object with specified messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    //take email and pw from body
    const { email, password } = req.body;

    //check if the same email exists in the db already
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email already in use');
    }

    //if not, create a new user and save it to db
    const user = User.build({ email, password });
    await user.save();
    res.status(201).send(user);
  }
);

export { router as signupRouter };
