import { Router, Request, Response, NextFunction } from "express";
import {
  googleAuth,
  googleAuthCallback,
} from "./controllers/GoogleAuthController";
import jwt from "jsonwebtoken";

const router = Router();
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies?.auth_token;

  if (!token) {
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.redirect("/");
  }
};
router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/dashboard", authMiddleware, (req, res) => {
  res.render("dashboard", {
    user: req.user,
    layout: "dashboard_layout",
  });
});

export default router;
