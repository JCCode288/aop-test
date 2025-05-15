import { CRUDStrategy } from "src/interfaces/crud.strategy";
import { IAddTodo, IEditTodo, ITodo, IQueryTodo } from "./todo.interface";
import { BadReqError, BaseError } from "../errorHandler/error";

export default class TodoService implements CRUDStrategy<ITodo, IAddTodo> {
   private _data: ITodo[] = [];

   async add(data: IAddTodo) {
      try {
         const id = this._data.length + 1;
         const todo: ITodo = { id, title: data.title, completed: false };

         this._data.push(todo);

         return todo;
      } catch (err) {
         if (err instanceof BaseError) throw err;
         console.log("[Unhandled Error]");
         console.error(err);
         throw err;
      }
   }
   async get<K = IQueryTodo>(query?: K) {
      try {
         if (!query) return this._data;

         let data: ITodo[] = [];

         for (const curr of this._data) {
            let flag = true;

            for (const key in query) {
               if (curr[key as keyof ITodo] === query[key]) {
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
   async update<K = IEditTodo>(id: number, data: K) {
      try {
         const currIdx = this._data.findIndex((td) => td.id === id);
         // -1 is not found
         if (currIdx < 0) throw new BadReqError("todo not found");

         const currData = this._data[currIdx];

         const updatedData = { ...currData, ...data };
         this._data[currIdx] = updatedData;

         return this._data[currIdx];
      } catch (err) {
         if (err instanceof BaseError) throw err;
         console.log("[Unhandled Error]");
         console.error(err);
         throw err;
      }
   }
   async delete(id: number) {
      try {
         const currIdx = this._data.findIndex((td) => td.id === id);
         if (currIdx < 0) throw new BadReqError("todo not found");

         const deleted = this._data.splice(currIdx, 1);

         return deleted[0];
      } catch (err) {
         if (err instanceof BaseError) throw err;
         console.log("[Unhandled Error]");
         console.error(err);
         throw err;
      }
   }
}
