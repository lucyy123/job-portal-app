
/// <reference types="vite/client" />
export type User={
    fullName?: string;
    email: string;
    password: string;
    phoneNumber?: string;
    profile?: UserProfileType;
    role: string;
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
    message: string,
    success: boolean,
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