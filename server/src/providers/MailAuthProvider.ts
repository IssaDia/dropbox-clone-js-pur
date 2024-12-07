import { AuthProvider } from "../interfaces/AuthProviderInterface";
import { Request, Response } from "express";


class MailAuthController implements AuthProvider {

   static async  register (req : Request, res: Response) {
        console.log("mail auth"), req.body;
        
    } 

}

export default MailAuthController