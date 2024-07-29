import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";



 export type UserProfileType={
    bio?:string,
    skills?:string [],
    resume?:string,
    resumeOriginalName?:string,
    company?: string,
    profilePhoto?:string

}
//Register user request body
export type UserRegisterReqBody={
 fullName:string;
 email:string;
 password:string;
 phoneNumber:string;
 profile?:UserProfileType;
 role:string,
 

}




export type UserLoginReqBody={


  email:string;
  password:string;
  role:string;

}

export interface NewRequest extends Request {
  id?: string;
}




export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<any, Record<string, any>>>;
  

