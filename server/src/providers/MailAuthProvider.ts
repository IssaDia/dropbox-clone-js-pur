import { AuthProvider } from "../interfaces/AuthProviderInterface";
import { Request, Response } from "express";


class MailAuthController implements AuthProvider {

      async register (req : Request, res: Response): Promise<void> {
        console.log(req.body);
        
    } 

}

export default MailAuthController