//this file configures and exports the express app
import express from 'express';
//this module handles async for express function
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@fflibs/common';

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';

const app = express();
//this is to work with nginx proxy and https
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    //we are not encrypting cookie because we send JWT
    //which is already encrypted
    signed: false,
    //https connection or http if during test
    secure: process.env.NODE_ENV !== 'test',
  })
);
//wire middleware for auth
app.use(currentUser);

//add routes
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);

//if ruote does not exist throw an error
app.get('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

//named exports has to be with curly braces
export { app };
