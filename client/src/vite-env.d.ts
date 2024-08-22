
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
}

export type JobsResponseMessage ={
  success:boolean;
  Jobs:Jobs[]

}


export type JobResponseMessage={
  success:boolean,
  job:Jobs
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