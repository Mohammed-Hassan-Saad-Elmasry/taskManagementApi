import { NextFunction, Response } from "express";
import { asynchandler } from "../../../utils/errorhandleing";
import UserModel from "../../../../db/models/user.model";

export class Users {
  getUser = asynchandler(
    async (req: any, res: Response, next: NextFunction) => {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        const error = new Error("User not found") as any;
        error.cause = 400;
        return next(new error());
      }
      return res.status(200).json({ message: "Done", user });
    }
  );
}
