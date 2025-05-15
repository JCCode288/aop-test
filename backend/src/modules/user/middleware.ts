import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../errorHandler/error";
import jwt from "jsonwebtoken";

export function authenticationMiddleware(
   req: Request,
   _: Response,
   next: NextFunction
) {
   try {
      const authorization = req.headers.authorization;
      if (!authorization) throw new UnauthenticatedError();

      const splittedAuth = authorization?.split(" ");
      if (splittedAuth?.length !== 2) throw new UnauthenticatedError();

      const token = splittedAuth[1];

      const payload = jwt.decode(token);
      if (
         !payload ||
         typeof payload === "string" ||
         !payload.id ||
         !payload.username
      )
         throw new UnauthenticatedError();

      (req as Request & { context: jwt.JwtPayload }).context = payload;

      next();
   } catch (err) {
      next(err);
   }
}
