import express from "express";
import { IAddTodo, IEditTodo, IQueryTodo } from "./todo.interface";
import TodoService from "./todo.service";
import { BadReqError } from "../errorHandler/error";

const todoRouter = express.Router();
const provider = new TodoService();

todoRouter.get("/", async function (req, res, next) {
   try {
      const query: IQueryTodo = req.query;
      const todos = await provider.get(query);

      res.status(200).json({ status: 200, message: "ok", data: todos });
   } catch (err) {
      next(err);
   }
});
todoRouter.post("/", async function (req, res, next) {
   try {
      const body: IAddTodo = req.body;
      if (!body) throw new BadReqError("Invalid payload");

      const todo = await provider.add(body);

      res.status(201).json({ status: 201, message: "ok", data: todo });
   } catch (err) {
      next(err);
   }
});
todoRouter.put("/:id", async function (req, res, next) {
   try {
      const idStr = req.params?.id;
      const body: IEditTodo = req.body;

      if (!idStr || !body) throw new BadReqError("Invalid payload");

      const id = +idStr;
      if (isNaN(id)) throw new BadReqError("Invalid ID");

      const todo = await provider.update(id, body);

      res.status(200).json({ status: 201, message: "ok", data: todo });
   } catch (err) {
      next(err);
   }
});

todoRouter.delete("/:id", async function (req, res, next) {
   try {
      const idStr = req.params?.id;
      if (!idStr) throw new BadReqError("Invalid payload");
      const id = +idStr;
      if (isNaN(id)) throw new BadReqError("Invalid ID");

      const todos = await provider.delete(id);

      res.status(200).json({ status: 201, message: "ok", data: todos });
   } catch (err) {
      next(err);
   }
});

export default todoRouter;
