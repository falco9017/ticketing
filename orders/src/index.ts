import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

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
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }

  //connect to mongodb
  try {
    //clusterId is taken from nats-depl.yaml
    //url is taken from service name and port in yaml file
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    //handle closing of NATS
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });
    //catch interrupt from console and try to close the server
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

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
