
/// <reference types="vite/client" />

import { ReactNode } from "react";


export type User={
    fullName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    profile?: UserProfileType;
    role?: string;
  };

  export type UserProfileType = {
    bio?: string;
    skills?: string[];
    resume?: string;
    resumeOriginalName?: string;
    company?: null;
    profilePhoto?: string;
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

