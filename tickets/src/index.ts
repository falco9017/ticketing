import mongoose from 'mongoose';
import { app } from './app';

/////STARTING FUNCTION
//all await async has to be wrapped for older node version
const start = async () => {
  //first check if env variable exists befor continuing
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  //the uri comes from the kube pod variable defined in tickets-depl
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  //connect to mongodb
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
