import { RegisterInterface } from "../RegisterInterface";

class MailAuth implements RegisterInterface {
 public static async register(): Promise<any> {
    console.log("mail");
    
 }
}

export default MailAuth