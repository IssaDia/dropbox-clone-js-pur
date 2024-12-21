import { Router } from "express";
import GoogleAuthController from "./controllers/GoogleAuthController";
import  MailAuthController from "./providers/MailProvider/MailProvider";
import { checkAndRefreshToken } from "./middlewares/checkRefreshToken";
import UserController from "./controllers/UserController";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "./middlewares/asyncHandler";


const router = Router();

const googleAuthController = new GoogleAuthController();
const mailAuthController = new MailAuthController();
const userController = new UserController();


router.use("/auth/token", checkAndRefreshToken);


router.get("/auth/google",googleAuthController.googleAuth);
router.get("/auth/google/callback",googleAuthController.googleAuthCallback);
router.get("/auth/token",googleAuthController.getAuthToken);


router.post("/auth/mail", asyncHandler(userController.register));

export default router;
