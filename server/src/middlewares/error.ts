import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/allType.js";
import ErrorHandler from "../utils/errorHandlerClass.js";

export const errorMiddleware=(err:ErrorHandler,req:Request,res:Response,next:NextFunction)=>{
err.message ||="Some Error From Backend Side";
err.statusCode ||=500;

return res.status(err.statusCode).json({
    message:err.message,
    success:false
})

}

export const TryCatch=(func:ControllerType)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        return Promise.resolve(func(req,res,next)).catch((next))
    }
}