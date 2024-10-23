import { RegisterInterface } from "../RegisterInterface";

class GoogleAuth implements RegisterInterface {
  public static async register() {
    try {
      const response = await fetch("http://localhost:5001/api/google_auth", {
        credentials: "include",
      });
      const data = await response.json();
      // Redirect in the frontend
      window.location.href = data.url;
    } catch (error) {
      console.error("Failed to initiate auth:", error);
    }
  }

  public logout() {}
}

export default GoogleAuth;
