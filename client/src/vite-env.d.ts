/// <reference types="vite/client" />
export type User={
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    profile?: UserProfileType;
    role: string;
  };

  export type UserProfileType = {
    bio?: string;
    skills?: string[];
    resume?: string;
    resumeOriginalName?: string;
    company?: string;
    profilePhoto?: string;
  };

  export type UserResponseMessage={
    message: string,
    success: boolean
  }


export type UserReducerInitialState={
    loading:boolean;
    user:User | null
}