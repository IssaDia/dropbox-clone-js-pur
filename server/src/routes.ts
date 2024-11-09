import { Router } from "express";
import GoogleAuthController from "./providers/GoogleAuthProvider";
import  MailAuthController from "./providers/MailAuthProvider";
import { checkAndRefreshToken } from "./middlewares/checkRefreshToken";

const router = Router();

// Instancier les contrôleurs
const googleAuthController = new GoogleAuthController();
const mailAuthController = new MailAuthController();

router.use("/auth/token", checkAndRefreshToken);


// Routes Google Auth
router.get("/auth/google", (req, res) => googleAuthController.googleAuth(req, res));
router.get("/auth/google/callback", (req, res) => googleAuthController.googleAuthCallback(req, res));
router.get("/auth/token", (req, res) => googleAuthController.getAuthToken(req, res));

// Route Mail Auth
// router.get("/auth/mail", (req, res) => mailAuthController.mailAuth(req, res));

export default router;
