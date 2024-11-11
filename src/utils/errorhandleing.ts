import { Request, Response, NextFunction } from "express";
class Handler {
  asynchandler(
    fun: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      fun(req, res, next).catch((err: Error) => {
        next(err);
      });
    };
  }

  errorhandling(error: any, req: Request, res: Response, next: NextFunction) {
    const response: { message: string; stack?: string } = {
      message: error.message || "Something went wrong",
    };
    res.status(error.cause || 400).json(response);
  }
}

export const asynchandler = new Handler().asynchandler;
export const errorhandling = new Handler().errorhandling;
