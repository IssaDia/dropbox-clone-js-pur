import { RegisterInterface } from "../RegisterInterface";

class MailAuth implements RegisterInterface {
 public static async register(formData: any): Promise<any> {
console.log(formData);

     
 }
}

export default MailAuth