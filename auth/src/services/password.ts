import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

//for using promise, because scrypt is callback based
const scryptAsync = promisify(scrypt);

export class Password {
  //static functions are methods we can call without
  //having to create an instance of a class
  static async toHash(password: string) {
    //salt is part of hashing process
    const salt = randomBytes(8).toString('hex');
    //buffer, we specify as buffer for ts
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString('hex') === hashedPassword;
  }
}
