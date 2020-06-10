import mongoose from 'mongoose';
import { app } from './app';

/////STARTING FUNCTION
//name of the db. If it does not exist mongo is going to create it
const dbName = 'auth';
//name of the service comes from auth-mongo-depl file
const url = `mongodb://auth-mongo-srv:27017/${dbName}`;
//all await async has to be wrapped for older node version
const start = async () => {
  //first check if env variable exists befor continuing
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  //connect to mongodb
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
