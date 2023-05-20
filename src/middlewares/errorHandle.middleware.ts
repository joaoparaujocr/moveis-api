import { NextFunction, Request, Response } from "express";
import AppError from "../error";

const errorHandlerMiddleware = async (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandlerMiddleware;
