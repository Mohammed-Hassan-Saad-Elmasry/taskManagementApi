import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel from "../../db/models/user.model";

export class Auth {
  auth = async (req: any, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      const error = new Error("In-valid Bearer Key") as any;
      error.cause = 400;
      return next(error);
    }
    const token = authorization.split("Bearer ")[1];
    if (!token) {
      const error = new Error("In-valid Token") as any;
      error.cause = 400;
      return next(error);
    }
    try {
      const decoded = Jwt.verify(token, "Hamo");
      if (typeof decoded === "string" || !decoded?.id) {
        const error = new Error("invalid token payload ") as any;
        error.cause = 400;
        return next(error);
      }

      const user = await UserModel.findById({ _id: decoded.id });
      if (!user) {
        const error = new Error("User not found") as any;
        error.cause = 404;
        return next(error);
      }
      req.user = user;
      next();
    } catch (error) {
      const message =
        error instanceof Jwt.TokenExpiredError
          ? "JWT token has expired"
          : "Invalid Token";
      const jwtError = new Error(message) as any;
      jwtError.cause = 400;
      return next(jwtError);
    }
  };
}

export const auth = new Auth().auth;
