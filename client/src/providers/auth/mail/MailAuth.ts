import { RegisterInterface } from "../RegisterInterface";

class MailAuth implements RegisterInterface {
 public static async register(formData: any): Promise<any> {
console.log(formData);
try {
    const response = await fetch("http://localhost:5001/api/auth/mail", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();

   

    // if (response.ok) {
    //     window.location.href = data.url;
    //   } else {
    //     // Handle potential error responses
    //     throw new Error(data.message || "Authentication failed");
    //   }
  } catch (error) {
    console.error("Failed to initiate auth:", error);
   
  }
 
}

    
 }


export default MailAuth