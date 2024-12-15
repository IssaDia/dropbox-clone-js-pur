import { Router } from "express";
import GoogleAuthController from "./providers/GoogleAuthProvider";
import  MailAuthController from "./providers/MailProvider/MailProvider";
import { checkAndRefreshToken } from "./middlewares/checkRefreshToken";

const router = Router();

const googleAuthController = new GoogleAuthController();
const mailAuthController = new MailAuthController();


router.use("/auth/token", checkAndRefreshToken);


router.get("/auth/google", (req, res) => googleAuthController.googleAuth(req, res));
router.get("/auth/google/callback", (req, res) => googleAuthController.googleAuthCallback(req, res));
router.get("/auth/token", (req, res) => googleAuthController.getAuthToken(req, res));


// router.post("/auth/mail", (req, res) => mailAuthController.register(req, res));

export default router;
