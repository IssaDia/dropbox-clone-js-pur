import { Router } from "express";
import {
  getAuthToken,
  googleAuth,
  googleAuthCallback,
} from "./controllers/GoogleAuthController";

const router = Router();

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);
router.get('/auth/token', getAuthToken);



export default router;
