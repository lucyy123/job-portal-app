
/// <reference types="vite/client" />

import { ReactNode } from "react";


export type User={
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
  applications: string[],
  createdAt: string,
  updatedA: string,
}

export type Company =  {
  _id: string,
  name: string,
  UserId: string,
  createdAt: string,
  updatedAt: string,
  discription:string
}



export type JobReducerInitialState ={
  jobs:Jobs[] | null
  loading:boolean
}

export type JobsResponseMessage ={
  success:boolean;
  Jobs:Jobs[]

}