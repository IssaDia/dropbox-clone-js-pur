import { Request, Response, NextFunction } from "express";
import GoogleAuthProvider from "../providers/GoogleAuthProvider";
import jwt from "jsonwebtoken";

export const checkAndRefreshToken = async (req: Request, res: Response, next: Function) => {

    const googleAuthProvider = new GoogleAuthProvider();


    
    if (req.session.tempToken && req.session.refreshToken) {
      const decoded = jwt.decode(req.session.tempToken) as { exp: number };
      const currentTime = Math.floor(Date.now() / 1000);
  
      if (decoded.exp - currentTime < 300) {
        try {
          const newAccessToken = await googleAuthProvider.refreshAccessToken(req.session.refreshToken);
          req.session.tempToken = jwt.sign({ ...decoded, exp: currentTime + 604800 }, process.env.JWT_SECRET as string, {
            expiresIn: "7d",
          });
          console.log("Jeton rafraîchi avec succès.");
        } catch (error) {
          console.error("Erreur lors du rafraîchissement du jeton :", error);
        }
      }
    }
    next();
  };
  