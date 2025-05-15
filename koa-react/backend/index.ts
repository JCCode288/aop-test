import Koa from "koa";
import Router from "@koa/router";
import { IAddTodo, IEditTodo, IQueryTodo } from "./db/interface";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import db from "./db";
import { todos } from "./db/schema";
import { eq } from "drizzle-orm";
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();
const PORT = 4000;

router.get("/", async function ({ request, response }, next) {
   try {
      const datas = await db.select().from(todos);
      response.body = datas;

      return await next();
   } catch (err) {
      response.status = 500;
      response.body = { message: "Internal Server Error" };
      return await next();
   }
});
router.post("/", async function ({ request, response }, next) {
   try {
      const payload = request.body as IAddTodo;
      if (!payload) {
         response.status = 400;
         response.body = { message: "invalid payload" };
         return await next();
      }

      const inserted = await db.insert(todos).values(payload).returning();
      response.status = 201;
      response.body = inserted;

      return await next();
   } catch (err) {
      response.status = 500;
      response.body = { message: "Internal Server Error" };
      return await next();
   }
});

router.get("/:id", async function ({ request, response, params }, next) {
   try {
      const query: IQueryTodo = params;

      if (!query.id) {
         response.status = 400;
         response.body = { message: "invalid id" };
         return await next();
      }

      const todoDatas = await db
         .select()
         .from(todos)
         .where(eq(todos.id, query.id))
         .limit(1);

      if (!todoDatas.length) {
         response.status = 400;
         response.body = { message: "invalid id" };
         return await next();
      }

      response.body = todoDatas[0];
      return await next();
   } catch (err) {
      response.status = 500;
      response.body = { message: "Internal Server Error" };
      return await next();
   }
});
router.put("/:id", async function ({ request, response, params }, next) {
   try {
      const query: IQueryTodo = params;

      if (!query.id) {
         response.status = 400;
         response.body = { message: "invalid id" };
         return await next();
      }
      const payload = request.body as IEditTodo;
      if (!payload) {
         response.status = 400;
         response.body = { message: "invalid payload" };
         return await next();
      }

      const todoDatas = await db
         .select()
         .from(todos)
         .where(eq(todos.id, query.id))
         .limit(1);

      if (!todoDatas.length) {
         response.status = 400;
         response.body = { message: "invalid id" };
         return await next();
      }

      const updatedData = { ...todoDatas[0], ...payload };

      const updated = await db
         .update(todos)
         .set(updatedData)
         .where(eq(todos.id, query.id))
         .returning();

      response.status = 201;
      response.body = updated;

      return await next();
   } catch (err) {
      response.status = 500;
      response.body = { message: "Internal Server Error" };
      return await next();
   }
});
router.delete(
   "/:id",
   async function ({ request, response, params }, next) {
      try {
         const query: IQueryTodo = params;

         if (!query.id) {
            response.status = 400;
            response.body = { message: "invalid id" };
            return await next();
         }
         const payload = request.body as IEditTodo;
         if (!payload) {
            response.status = 400;
            response.body = { message: "invalid payload" };
            return await next();
         }

         const todoDatas = await db
            .select()
            .from(todos)
            .where(eq(todos.id, query.id))
            .limit(1);
         if (!todoDatas.length) {
            response.status = 400;
            response.body = { message: "invalid id" };
            return await next();
         }

         const deleted = await db
            .delete(todos)
            .where(eq(todos.id, query.id))
            .returning();

         response.status = 201;
         response.body = deleted;

         return await next();
      } catch (err) {
         response.status = 500;
         response.body = { message: "Internal Server Error" };
         return await next();
      }
   }
);

app.use(cors());

app.use(json());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT);
