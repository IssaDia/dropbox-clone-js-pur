export interface AuthProvider {
    generateAuthUrl?(): string;
    getToken?(code: string): Promise<{ accessToken: string; refreshToken?: string }>;
    getUserInfo?(accessToken: string): Promise<UserInfo>;
  }
  
 
  export interface UserInfo {
    id: string;
    email: string;
    name: string;
    picture?: string;
  }