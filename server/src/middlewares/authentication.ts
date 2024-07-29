import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NewRequest } from "../types/allType.js";
import ErrorHandler from "../utils/errorHandlerClass.js";


export const isUserAuthenticated = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) return next(new ErrorHandler("Try to login frst", 400));

  const secretKey = process.env.SECRET_KEY!;
  const decode = jwt.verify(token, secretKey) as JwtPayload;

  if (!decode) return next(new ErrorHandler("Invalid Token", 404));

  req.id = decode.userId;
  next();
};
