import mongoose from 'mongoose';
import { Password } from '../services/password';

//a ts interface for the properties of user
interface UserAttrs {
  email: string;
  password: string;
}

//a ts interface to describe what properties the model has
interface UserModel extends mongoose.Model<UserDoc> {
  //returns an instance of the document
  build(attrs: UserAttrs): UserDoc;
}

//a ts interface that describes properties
//of a User Document returned from mongo
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  //this object is to customize json output of user model
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

//middleware function for operations to do before save
//we can't use arrow
userSchema.pre('save', async function (done) {
  //isModified is true also on first creating the object
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

//this is a function to make ts work with mongoose
//statics is to add function to a schema
//this way we can call User.build to create a new user
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// const user = User.build({email:'a', password:'b'})

export { User };
