import { RegisterInterface } from "../RegisterInterface";

class GoogleAuth implements RegisterInterface {
  static async register() {
    try {
      const response = await fetch("http://localhost:5001/api/auth/google", {
        credentials: "include",
      });
      const data = await response.json();

      window.location.href = data.url;
    } catch (error) {
      console.error("Failed to initiate auth:", error);
      window.location.href = "/";
    }
  }

  static async handleAuthCallback() {
    try {
      const urlParams = new URLSearchParams(window.location.search);

      const token = urlParams.get("token");
      const userStr = urlParams.get("user");

      if (!token || !userStr) {
        console.error("Missing token or user data");
        window.location.href = "/";
        return;
      }

      try {
        // Parse the user data from the URL
        const user = JSON.parse(decodeURIComponent(userStr));

      
        localStorage.setItem("auth_token", token);
     

        // Clean up URL and redirect
        window.history.replaceState({}, document.title, "/dashboard");
        window.location.href = "/dashboard";
      } catch (parseError) {
        console.error("Error parsing user data:", parseError);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Authentication callback failed:", error);
      window.location.href = "/";
    }
  }

  static logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    window.location.reload();
  }
  static isAuthenticated() {
    return localStorage.getItem("auth_token") !== null;
  }
  static getUserData() {
    try {
      const userData = localStorage.getItem("user_data");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }

  static async getToken() {
    const tokenResponse = await fetch("http://localhost:5001/api/auth/token", {
      credentials: "include",
    });
    const { token } = await tokenResponse.json();
    localStorage.setItem("authToken", token);
  }
}

export default GoogleAuth;
