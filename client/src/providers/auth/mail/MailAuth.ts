import { RegisterInterface } from "../RegisterInterface";

class MailAuth implements RegisterInterface {
 public static async register(): Promise<any> {
    try {

      const response = await fetch("http://localhost:5001/api/auth/google", {
         credentials: "include",
       });
       const data = await response.json();

    } catch  {

    }
     
 }
}

export default MailAuth