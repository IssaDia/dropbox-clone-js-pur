export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  picture: string;
  iat?: number;
  exp?: number;
}

export interface GoogleApiResponse {
  data: GoogleUserInfo;
}
