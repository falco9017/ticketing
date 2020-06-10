//this file configures and exports the express app
import express from 'express';
//this module handles async for express function
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
//this is to work with nginx proxy and https
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    //we are not encrypting cookie because we send JWT
    //which is already encrypted
    signed: false,
    //https connection
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
//if ruote does not exist throw an error
app.get('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

//named exports has to be with curly braces
export { app };
