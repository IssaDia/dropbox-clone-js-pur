import { Router } from "express";
import GoogleAuthController from "./providers/GoogleAuthProvider";
import  MailAuthController from "./providers/MailProvider/MailProvider";
import { checkAndRefreshToken } from "./middlewares/checkRefreshToken";
import UserController from "./controllers/UserController";

const router = Router();

const googleAuthController = new GoogleAuthController();
const mailAuthController = new MailAuthController();
const userController = new UserController();


router.use("/auth/token", checkAndRefreshToken);


router.get("/auth/google",googleAuthController.googleAuth);
router.get("/auth/google/callback",googleAuthController.googleAuthCallback);
router.get("/auth/token",googleAuthController.getAuthToken);


router.post("/auth/mail", userController.register);

export default router;
