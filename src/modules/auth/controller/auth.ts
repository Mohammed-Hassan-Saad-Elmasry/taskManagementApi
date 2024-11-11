
import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel from "../../../../db/models/user.model";
import { asynchandler } from "../../../utils/errorhandleing";
import bcrypt from "bcrypt";
export class Auth {
  constructor() {}
  singup = asynchandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        const error = new Error("Invalid data") as any;
        error.cause = 400;
        return next(error);
      }
      const existUser = await UserModel.findOne({ email });
      if (existUser) {
        const error = new Error("User already exists") as any;
        error.cause = 409;
        return next(error);
      }

      const hashpassword = bcrypt.hashSync(password, 6);
      const user = await UserModel.create({
        name,
        email,
        password: hashpassword,
      });
      return res
        .status(201)
        .json({ message: "User created successfully", user });
    }
  );

  Login = asynchandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      if (!email || !password) {
        const error = new Error("Invalid data") as any;
        error.cause = 400;
        return next(error);
      }

      const user = await UserModel.findOne({ email });

      if (!user) {
        const error = new Error("User not found") as any;
        error.cause = 404;
        return next(error);
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        const error = new Error("Invalid login data") as any;
        error.cause = 401;
        return next(error);
      }
      user.status = "Online";
      user.save();

      const accessToken = Jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        "Hamo",
        { expiresIn: 60 * 60 }
      );

      const refreshToken = Jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        "ALI",
        { expiresIn: 60 * 60 }
      );
      res.status(200).json({ message: "done",accessToken, refreshToken });
    }
  );
}
