export interface AuthProvider {
    generateAuthUrl?(): string;
    getToken?(code: string): Promise<{ accessToken: string; refreshToken?: string }>;
    getUserInfo?(accessToken: string): Promise<UserInfo>;
    mailAuth?() : Promise<void>;
  }
  
 
  export interface UserInfo {
    id: string;
    email: string;
    name: string;
    picture?: string;
  }