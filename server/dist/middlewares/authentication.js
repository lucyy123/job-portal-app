import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandlerClass.js";
export const isUserAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return next(new ErrorHandler("Try to login frst", 400));
    const secretKey = process.env.SECRET_KEY;
    const decode = jwt.verify(token, secretKey);
    if (!decode)
        return next(new ErrorHandler("Invalid Token", 404));
    req.id = decode.userId;
    next();
};
