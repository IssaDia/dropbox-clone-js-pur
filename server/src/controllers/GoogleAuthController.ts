import { Request, Response } from "express";
import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export const googleAuth = (req: Request, res: Response) => {
  console.log("working good");
  const oauth2Endpoint = process.env.OAUTH2ENDPOINT || "";
  const clientID = process.env.GOOGLECLIENTID || "";
  const clientSecret = process.env.GOOGLECLIENTSECRET || "";
  const callbackURL = process.env.REDIRECTURI || "";

  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
      },
      function (accessToken, refreshToken, profile, done) {
        console.log("token");

        // Ici, tu peux gérer l'utilisateur (par exemple, le créer dans ta base de données)
        return done(null, profile);
      }
    )
  );
};

export const googleAuthCallback = (req: Request, res: Response) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
};
