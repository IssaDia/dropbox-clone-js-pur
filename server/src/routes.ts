import { Router } from "express";
import {
  getAuthToken,
  googleAuth,
  googleAuthCallback,
} from "./controllers/GoogleAuthController";
import {
mailAuth
} from "./controllers/MailAuthController";

const router = Router();

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);
router.get('/auth/token', getAuthToken);
router.get("/auth/mail", mailAuth);
router.get('/auth/token', getAuthToken);



export default router;
