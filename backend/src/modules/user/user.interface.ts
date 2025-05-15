import bcrypt from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

if (process.env.NODE_ENV === "development") {
   config();
}

const SALT = +(process.env.BCRYPT_SECRET ?? "11");
const SECRET = process.env.JWT_SECRET ?? "some_secret";
const JWT_CONFIG = {};

export class User {
   id: number;
   username: string;
   private _password!: string;

   constructor({ id, username, password }: IUser) {
      this.id = id;
      this.username = username;
      this.password = password;
   }

   get password() {
      return this._password ?? "No Password";
   }
   set password(pass: string) {
      // in real case, consider using promised method of bcrypt
      this._password = bcrypt.hashSync(pass, SALT);
   }

   checkPass(pass: string) {
      return bcrypt.compareSync(pass, this.password);
   }

   get token() {
      return jwt.sign(
         { id: this.id, username: this.username },
         SECRET,
         JWT_CONFIG
      );
   }
}

export interface IUser {
   id: number;
   username: string;
   password: string;
}
export type ILogin = Omit<IUser, "id">;

export type IAddUser = Omit<IUser, "id">;
export type IEditUser = Partial<Omit<IUser, "id">>;
export type IQueryUser = Partial<IUser>;
