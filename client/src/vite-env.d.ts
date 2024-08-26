/// <reference types="vite/client" />

import { ReactNode } from "react";


export type User={
  UserId:string,
    fullName?: string | Blob;
    email?: string;
    password?: string;
    phoneNumber?: string;
    role?: string;
    bio?: string;
    skills?: string[];
    resume?: string;
    resumeOriginalName?: string;
    company?: null;
    profilePhoto?: File | undefined;
  };

  

  export type UserResponseMessage<User>={
    message?: string,
    success?: boolean,
    user?:User
  }

export type Userlogn={
  email: string;
  password: string;
  role:string;
}

export type UserReducerInitialState={
    loading:boolean;
    user:User | null
}

export type UserLogin={
  email:string,
  password:string,
  role:string
}

export interface HeaderMenuType{
name:string,
link:string
}

export type FilterOptionsType={
  filterType:string;
  filters:string []
}

export type  AppliedJobsTableRowType = {
id:number;
date:string;
jobRole:string;
company:string;
status: ReactNode

}


export type UserUpdateResponseMessage={
  message:string;
  success:boolean;
  updatedUser:User | null
}


export type UserRegisterRequest={
 formdata:FormData
}

export type UserUpdateRequest ={
  formdata:FormData
}
export type LogoutUserResponseMessage={
  message: string,
  success: boolean,
}


export type Company =  {
  _id: string,
  name: string,
  UserId: string,
  website?:string
  logo?:string,
  location?:string
  createdAt: string,
  updatedAt: string,
  discription:string
}

export type Application = {
  _id: string,
  job: string,
  applicants:string,
  status: 'pending','accepted','rejected',
  createdAt: string,
  updatedAt: string,

}


export type Jobs ={
  _id: string,
  title: string,
  jobType: string,
  discription: string,
  requirments:string [],
  experienceLevel: number,
  location: string,
  salary: number,
  created_by: string,
  position: string,
  company:Company,
  applications: Application[],
  createdAt: string,
  updatedA: string,
}




export type JobReducerInitialState ={
  jobs:Jobs[] | null
  loading:boolean
  getJob: Jobs | null
  adminJobs:Jobs[] | null
  adminSingleJob:Jobs |null
}

export type JobsResponseMessage ={
  success:boolean;
  Jobs:Jobs[]

}


export type JobResponseMessage={
  success:boolean,
  job:Jobs
}

export type AminAllJobResponseMessage={
  success:boolean,
  jobs:Jobs[]
}

export type AuthTokenInitialState ={
  token: string | null
  tokenLoading:boolean
}


export type adminCompaniesTable = {
  id: number;
  logo: string;
  name: string;
  date: string;
}

export type ComapniesReducerInitialState = {
  companies:Company[] | null
  singleCompany:Company | null
  loading:boolean

}

export type GetAllComapanyResponseMessage ={
  success: boolean,
  companies: Company[],
}

export type SinglecompanyResponseCompany={
  success:boolean,
  company:Company
}

export type CreateCompanyRequest ={
  id?:string
  formdata:FormData
}
export type CreateCompanyRespone={
  message: string,
  company: Company,
  success: boolean
  updateCompany?:Company
}

 export type NewCompanyRequest={
  name:string
}

type TableRowsType = {
  id: string;
  logo: string;
  name: string;
  date: string;
  update: string;
};
type TableAdminRowsType = {
  id: string;
  company: string;
  role: string;
  date: string;
  update?: string;
};

export type JobCreated ={
  title: string,
  jobType: string,
  discription: string,
  requirments:string,
  experienceLevel: string,
  location: string,
  salary: string,
  position: string,
  company:string,
}
 

export type JobCreatedResMessage  = {
  success:boolean;
  message:string
}



export type  UserAppliedToJob={
  _id: string;
  job: string;
  applicants:Applicants;
  status: string;
  createdAt: string;
  updatedAt: string;
}


export type Applicants = {
  _id: string,
  fullName: string,
  email: string,
  phoneNumber: number,
  resume:string;
}


export type ApplicationsRes =  {
  _id: string;
  title: string;
  jobType: string;
  discription: string;
  requirments:string[],
  experienceLevel: number,
  location: string;
  salary: number
  created_by: string,
  position:string,
  company: string,
  applications: UserAppliedToJob[],
  createdAt: string,
  updatedAt: string,
}




export type getAllApplicantsOfJobResMessage = {
  success: boolean,
   applications:ApplicationsRes
}

export type ApplicationsReducerInitialState ={
  loading:boolean;
  applications: ApplicationsRes | null
}

export type AdminApplicantsRow = {
  id: string;
  full_name: string;
  email: string;
  contact: string;
  resume: string;
  date: string;
  status:string
}


export type UpdateApplicationResponse = {
  message:string;
  success:boolean
  application:UserAppliedToJob
}

export type UpdateApplicationReq = {
id:string
data:{
  status:string
}

}