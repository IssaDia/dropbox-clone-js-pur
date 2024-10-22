import { RegisterInterface } from "../RegisterInterface";

class GoogleAuth implements RegisterInterface {
  public static async register() {
    try {
      const response = await fetch("http://localhost:5001/api/google_auth", {
        method: "GET",
        credentials: "include", // si vous avez besoin d'envoyer des cookies
      });
      if (!response.ok) throw new Error("Failed to authenticate with Google");
      // Gestion de la réponse ici
    } catch (error) {
      console.error(error);
    }
  }

  public logout() {}
}

export default GoogleAuth;
