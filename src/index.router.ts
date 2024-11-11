import express, { Request } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "../src/modules/task/schema";
import authRouter from "./modules/auth/auth.router";
import userRouter from "./modules/user/user.router";
import taskRouter from "./modules/task/task.router";
import { errorhandling } from "./utils/errorhandleing";
import { auth } from "./middleware/auth";

export class Bootstrap {
  constructor(private app: express.Application) {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.app.use("/auth", authRouter);
    this.app.use("/user", userRouter);
    this.app.use("/task", taskRouter);

    this.app.use("/graphql", auth, (req, res, next) => {
      const handler = createHandler({
        schema,
        context: { req },
      });
      return handler(req, res, next);
    });
    this.app.use(errorhandling);
  }
}
