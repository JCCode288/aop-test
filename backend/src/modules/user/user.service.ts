import { CRUDStrategy } from "src/interfaces/crud.strategy";
import {
   IAddUser,
   IEditUser,
   IQueryUser,
   IUser,
   User,
} from "./user.interface";
import { BadReqError, BaseError } from "../errorHandler/error";

export default class UserService implements CRUDStrategy<User, IAddUser> {
   private _data: User[] = [];

   async get<K = IQueryUser>(query?: K): Promise<User[]> {
      try {
         if (!query) return this._data;

         let data: User[] = [];

         for (const curr of this._data) {
            let flag = true;

            for (const key in query) {
               if (curr[key as keyof User] === query[key]) {
                  continue;
               }

               flag = false;
               break;
            }

            if (flag) data.push(curr);
         }

         return data;
      } catch (err) {
         if (err instanceof BaseError) throw err;
         console.log("[Unhandled Error]");
         console.error(err);
         throw err;
      }
   }
   async add({ username, password }: IAddUser): Promise<User> {
      try {
         const userIdx = this._data.findIndex(
            (u) => u.username === username
         );

         if (userIdx >= 0) throw new BadReqError("Username already used");

         const id = this._data.length + 1;
         const user: User = new User({ id, username, password });

         this._data.push(user);

         return user;
      } catch (err) {
         if (err instanceof BaseError) throw err;
         console.log("[Unhandled Error]");
         console.error(err);
         throw err;
      }
   }
   async update<K = IEditUser>(id: number, data: K): Promise<User> {
      try {
         const currIdx = this._data.findIndex((u) => u.id === id);

         if (currIdx < 0) throw new BadReqError("User not found");

         const currData = this._data[currIdx];

         const updatedData = {
            username: currData.username,
            password: currData.password,
            ...data,
         } as unknown as IUser;
         const user = new User(updatedData);

         this._data[currIdx] = user;

         return this._data[currIdx];
      } catch (err) {
         if (err instanceof BaseError) throw err;
         console.log("[Unhandled Error]");
         console.error(err);
         throw err;
      }
   }
   async delete(id: number): Promise<User> {
      try {
         const currIdx = this._data.findIndex((u) => u.id === id);
         if (!currIdx) throw new BadReqError("User not found");

         const currData = this._data.splice(currIdx, 1);

         return currData[0];
      } catch (err) {
         if (err instanceof BaseError) throw err;
         console.log("[Unhandled Error]");
         console.error(err);
         throw err;
      }
   }
}
