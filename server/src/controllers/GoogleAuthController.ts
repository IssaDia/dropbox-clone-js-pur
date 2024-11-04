import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  GoogleApiResponse,
  GoogleUserInfo,
  JWTPayload,
} from "../interfaces/GoogleAuthInterface";
import { Session } from "express-session";

dotenv.config();

const oauth2Client = new OAuth2Client(
  process.env.GOOGLECLIENTID,
  process.env.GOOGLESECRET,
  process.env.REDIRECTURI
);

interface CustomSessionData extends Session {
  tempToken?: any;
}

declare module "express-session" {
  interface SessionData extends CustomSessionData {}
}

type RequestHandler = (req: Request, res: Response) => void | Promise<void>;


export const googleAuth:RequestHandler = (req: Request, res: Response) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "consent",
    include_granted_scopes: true,
  });

  res.json({ url: authUrl });
 
};

export const googleAuthCallback:RequestHandler = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    if (typeof code !== "string") {
      throw new Error("Invalid authorization code");
    }

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user information
    const userInfoResponse: GoogleApiResponse = await oauth2Client.request({
      url: process.env.GOOGLEAPIURL,
    });
    const userInfo: GoogleUserInfo = userInfoResponse.data;

    const tokenPayload: JWTPayload = {
      userId: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
    };

    const customToken = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    req.session.tempToken = customToken; 


    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${customToken}`);

   

  } catch (error) {
    console.error("OAuth callback error:", error);
    res.redirect(`${process.env.CLIENT_URL}/auth-error`);
  }
};

export const getAuthToken:RequestHandler = (req: Request, res: Response): void => {
  const token = req.session.tempToken;
  
  if (token) {
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Token not found' });
  }
};
