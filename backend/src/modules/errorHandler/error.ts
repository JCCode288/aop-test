export class BaseError extends Error {
   status: number;
   message: string;
   constructor(message: string = "Something happened") {
      super(message);
      this.status = 500;
      this.message = message;
   }
}

export class InternalServerError extends BaseError {
   status: number = 500;
   message: string = "Internal Server Error";
}

export class UnauthorizedError extends BaseError {
   status = 403;
   message: string = "Unauthorized";
}

export class UnauthenticatedError extends BaseError {
   status = 401;
   message: string = "Unauthenticated";
}

export class BadReqError extends BaseError {
   status = 400;
   message: string;

   constructor(message: string) {
      super(message);
      this.message = message;
   }
}
