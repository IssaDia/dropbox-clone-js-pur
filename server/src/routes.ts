import { Router } from "express";
import GoogleAuthController from "./providers/GoogleAuthProvider";
import  MailAuthController from "./providers/MailAuthProvider";
import { checkAndRefreshToken } from "./middlewares/checkRefreshToken";
import UserController from "./controllers/UserController";

const router = Router();

// Instancier les contrôleurs
const googleAuthController = new GoogleAuthController();
const mailAuthController = new MailAuthController();
const userController = new UserController();


router.use("/auth/token", checkAndRefreshToken);


router.get("/auth/google", (req, res) => googleAuthController.googleAuth(req, res));
router.get("/auth/google/callback", (req, res) => googleAuthController.googleAuthCallback(req, res));
router.get("/auth/token", (req, res) => googleAuthController.getAuthToken(req, res));


router.get("/auth/mail", (req, res) => MailAuthController.register(req, res));

export default router;
