import { Request, Response } from "express";
// import passport from "passport";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new OAuth2Client(
  process.env.GOOGLECLIENTID,
  process.env.GOOGLESECRET,
  "http://localhost:5001/api/auth/google/callback"
);

export const googleAuth = (req: Request, res: Response) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
    prompt: "consent",
    include_granted_scopes: true,
  });

  // Instead of redirecting, send the URL to the client
  res.json({ url: authUrl });
};

export const googleAuthCallback = async (req: Request, res: Response) => {
  console.log("callback");
  //   passport.authenticate("google", { failureRedirect: "/login" }),
  //     (req: Request, res: Response) => {
  //       // Si l'authentification réussit, redirigez vers /dashboard
  //       res.redirect("http://localhost:8080/dashboard");
  //     };
  try {
    const { code } = req.query;

    if (typeof code !== "string") {
      throw new Error("Invalid authorization code");
    }

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user information
    const userInfoResponse = await oauth2Client.request({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
    });

    // Here you would typically:
    // 1. Create or update user in your database
    // 2. Create a session or JWT
    // 3. Set appropriate cookies

    // Redirect back to frontend with success
    res.redirect(`${process.env.CLIENT_URL}/auth-success`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.redirect(`${process.env.CLIENT_URL}/auth-error`);
  }

  //   passport.authenticate("google", (err: any, user: any, info: any) => {
  //     if (err) {
  //       return res.status(500).json({ error: "Something went wrong." });
  //     }
  //     if (!user) {
  //       return res.status(401).json({ error: "User not authenticated." });
  //     }
  //     // Gérer l'utilisateur authentifié (par exemple, créer une session ou envoyer une réponse)
  //     req.logIn(user, (err) => {
  //       if (err) {
  //         return res.status(500).json({ error: "Failed to log in user." });
  //       }
  //       return res
  //         .status(200)
  //         .json({ message: "User authenticated successfully!", user });
  //     });
  //   })(req, res);
};
