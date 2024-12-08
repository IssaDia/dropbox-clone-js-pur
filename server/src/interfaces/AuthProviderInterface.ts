import { Request, Response } from "express";
export interface AuthProvider {
    generateAuthUrl?(): string;
    getToken?(code: string): Promise<{ accessToken: string; refreshToken?: string }>;
    getUserInfo?(accessToken: string): Promise<UserInfo>;
    register?(req: Request, res: Response) : Promise<void>;

  }
  
 
  export interface UserInfo {
    id: string;
    email: string;
    name: string;
    picture?: string;
  }