import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

//extends global interface
declare global {
  namespace NodeJS {
    interface Global {
      signup(): string[];
    }
  }
}

//to replace the real file with the mock
jest.mock('../nats-wrapper');

//create a mongodb server and connect with mongoose
//since tests are running on local machine
//we need also to define JWT_KEY in env
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'test';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

//delete all collections from previous tests
beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

//close db and connection
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

//global function, but available only for test
global.signup = () => {
  //build a jwt payload. {id, email}
  const payload = {
    //random id
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  //create a jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //build session object {jwt: JWT}
  const session = { jwt: token };

  //turn into JSON
  const sessionJSON = JSON.stringify(session);

  //take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return a cookie string with data
  return [`express:sess=${base64}`];
};
