import express, { Request } from "express";
import UserService from "./user.service";
import { BadReqError, UnauthenticatedError } from "../errorHandler/error";
import { IAddUser, ILogin } from "./user.interface";
import { JwtPayload } from "jsonwebtoken";
import { authenticationMiddleware } from "./middleware";

const userRouter = express.Router();
const provider = new UserService();

userRouter.post("/register", async function (req, res, next) {
   try {
      const body: IAddUser = req.body;
      if (!body) throw new BadReqError("Invalid payload");

      const { username, password } = body;
      if (!username || !password)
         throw new BadReqError("Empty username or password");

      const registered = await provider.add(body);

      const payload = {
         id: registered.id,
         username: registered.username,
      };

      res.status(201).json({ status: 201, message: "ok", data: payload });
   } catch (err) {
      next(err);
   }
});

userRouter.post("/login", async function (req, res, next) {
   try {
      const body: ILogin = req.body;
      if (!body) throw new BadReqError("Invalid payload");

      const { username, password } = body;
      if (!username || !password)
         throw new BadReqError("Empty username or password");

      const users = await provider.get({ username });
      if (users.length !== 1) throw new UnauthenticatedError();

      const user = users[0];
      const validPass = user.checkPass(password);

      if (!validPass) throw new UnauthenticatedError();

      const payload = { username: user.username, token: user.token };

      // assumed logging and session will be done later
      res.status(201).json({ status: 201, message: "ok", data: payload });
   } catch (err) {
      next(err);
   }
});

userRouter.all("/register", async function (req, res, next) {
   res.status(403).json({
      status: 403,
      message: "method not implemented",
      data: null,
   });
});

userRouter.all("/login", async function (req, res, next) {
   res.status(403).json({
      status: 403,
      message: "method not implemented",
      data: null,
   });
});

userRouter.get(
   "/:id",
   authenticationMiddleware,
   async function (req: Request, res, next) {
      try {
         const idStr = req.params?.id;
         if (!idStr) throw new BadReqError("Invalid ID");
         const ctx = (req as Request & { context: JwtPayload }).context;

         const id = +idStr;
         if (isNaN(id)) throw new BadReqError("Invalid ID");
         if (ctx.id !== id) throw new UnauthenticatedError();

         const query = { id };
         const users = await provider.get(query);

         if (users.length !== 1) throw new BadReqError("User not found");

         const user = users[0];
         const payload = { id: user.id, username: user.username };

         res.status(200).json({
            status: 200,
            message: "ok",
            data: payload,
         });
      } catch (err) {
         next(err);
      }
   }
);

userRouter.put("/:id/edit", async function (req, res, next) {
   res.status(403).json({
      status: 403,
      message: "method not implemented",
      data: null,
   });
});
userRouter.delete("/:id/delete", async function (req, res, next) {
   res.status(403).json({
      status: 403,
      message: "method not implemented",
      data: null,
   });
});

export default userRouter;
