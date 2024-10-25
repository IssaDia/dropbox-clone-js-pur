import { Router, Request, Response, NextFunction } from "express";
import {
  googleAuth,
  googleAuthCallback,
} from "./controllers/GoogleAuthController";
import jwt from "jsonwebtoken";

const router = Router();
router.get("/google_auth", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token; // Si vous utilisez les cookies
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      res.locals.user = decoded; // Accessible dans les templates Handlebars
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }
  next();
};

router.get("/dashboard", authMiddleware, (req, res) => {
  res.render("dashboard");
});

export default router;
