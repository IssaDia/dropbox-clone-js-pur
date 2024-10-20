import { Router } from "express";
import {
  googleAuth,
  googleAuthCallback,
} from "./controllers/GoogleAuthController";

const router = Router();
router.get("/google_auth", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);

export default router;
