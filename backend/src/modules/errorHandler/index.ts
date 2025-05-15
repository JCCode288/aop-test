import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { BaseError, InternalServerError } from "./error";

export default function errorHandler(
   err: Error,
   _: Request,
   res: Response,
   __: NextFunction
) {
   console.log(err);

   switch (true) {
      case err instanceof BaseError:
         res.status(err.status).json({
            status: err.status,
            message: err.message,
         });
         return;

      case err instanceof JsonWebTokenError:
         res.status(401).json({
            status: 401,
            message: err.message,
         });
         return;

      default:
         res.status(500).json(new InternalServerError());
         return;
   }
}
