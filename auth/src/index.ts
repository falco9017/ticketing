import express from 'express';
//this module handles async for express function
import 'express-async-errors';
import { json } from 'body-parser';

import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
//if ruote does not exist throw an error
app.get('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

// app.get('/api/users/test', (req, res) => {
//   res.send('Hi');
// });

//name of the db. If it does not exist mongo is going to create it
const dbName = 'auth';
//name of the service comes from auth-mongo-depl file
const url = `mongodb://auth-mongo-srv:27017/${dbName}`;

//starting function
//all await async has to be wrapped for older node version
const start = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to mongoDB');
  } catch (err) {
    console.log(err);
  }

  //start to listen for incoming traffic
  app.listen(3000, () => {
    console.log('Listening on 3000');
  });
};

start();
