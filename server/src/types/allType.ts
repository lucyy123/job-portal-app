import { NextFunction, Request, Response } from "express";


//Register user request body
export type UserRegisterReqBody = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  bio?: string;
  skills?: string[];
  resume?: string;
  resumeOriginalName?: string;
  company?: string;
  profilePhoto?: string;
};

export type UserLoginReqBody = {
  email: string;
  password: string;
  role: string;
};

export type CompanyReqBody = {
  name: string;
  discription?: string;
  website?: string;
  logo?: string;
};

export type JobReqBody={
  title:string;
  jobType:string;
  discription:string;
  requirments?:string
  experienceLevel:string;
  location?:string;
  salary:string;
  created_by:string;
  position:string;
  company:string;
  applications?:string[] | string;

}



export type StatusReqBody={
  status:'pending'|'accepted'|'rejected';
}

export interface NewRequest<CompanyReqBody,JobReqBody> extends Request {
  id?: string;
  company?:CompanyReqBody
  job?:JobReqBody

}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
