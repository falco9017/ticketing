import express from 'express';
//this module handles async for express function
import 'express-async-errors';
import { json } from 'body-parser';
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

app.listen(3000, () => {
  console.log('Listening on 3000');
});
