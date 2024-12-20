import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthProvider, UserInfo } from "../interfaces/AuthProviderInterface";

dotenv.config();

declare module "express-session" {
  interface SessionData {
    tempToken?: string;
    refreshToken?: string;
  }
}

 class GoogleAuthController implements AuthProvider {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLECLIENTID,
      process.env.GOOGLESECRET,
      process.env.REDIRECTURI
    );
  }

  generateAuthUrl(): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      prompt: "consent",
      include_granted_scopes: true,
    });
  }

  async getToken(code: string): Promise<{ accessToken: string; refreshToken?: string }> {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    if (!tokens.refresh_token) {
      console.warn("Aucun refresh token n'a été reçu, ce qui peut limiter la capacité à rafraîchir le jeton d'accès.");
    }
    return {
      accessToken: tokens.access_token as string,
      refreshToken: tokens.refresh_token ?? undefined,
    };
  }

   async  refreshAccessToken(refreshToken: string): Promise<string> {
    this.oauth2Client.setCredentials({ refresh_token: refreshToken });
    const { credentials } = await this.oauth2Client.refreshAccessToken(); 
    return credentials.access_token as string;
  }

  async getUserInfo(accessToken: string): Promise<UserInfo> {
    this.oauth2Client.setCredentials({ access_token: accessToken });
    const userInfoResponse = await this.oauth2Client.request({
      url: process.env.GOOGLEAPIURL,
    });
    const userInfo = userInfoResponse.data as UserInfo;

    return {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
    };
  }

  googleAuth(req: Request, res: Response): void {
    const authUrl = this.generateAuthUrl();
    res.json({ url: authUrl });
  }

  async googleAuthCallback(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.query;
      if (typeof code !== "string") {
        throw new Error("Invalid authorization code");
      }

      const { accessToken, refreshToken } = await this.getToken(code);

      if (refreshToken) {
        req.session.refreshToken = refreshToken;
      }
      const userInfo = await this.getUserInfo(accessToken);

      const tokenPayload = {
        userId: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
      };

      const customToken = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
      });

      req.session.tempToken = customToken;
      res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${customToken}`);
    } catch (error) {
      console.error("OAuth callback error:", error);
      res.redirect(`${process.env.CLIENT_URL}/auth-error`);
    }
  }

  getAuthToken(req: Request, res: Response): void {
    const token = req.session.tempToken;
    if (token) {
      res.json({ token });
    } else {
      res.status(401).json({ error: "Token not found" });
    }
  }

  
}



export default GoogleAuthController;
