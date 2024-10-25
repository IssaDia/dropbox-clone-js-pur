import { RegisterInterface } from "../RegisterInterface";

class GoogleAuth implements RegisterInterface {
  public static async register() {
    try {
      const response = await fetch("http://localhost:5001/api/google_auth", {
        credentials: "include",
      });
      const data = await response.json();
      localStorage.setItem("auth_state", "pending");

      window.location.href = data.url;
    } catch (error) {
      console.error("Failed to initiate auth:", error);
    }
  }

  static handleAuthCallback() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userDataStr = urlParams.get("user");

    if (token) {
      localStorage.setItem("auth_token", token);
      if (userDataStr) {
        try {
          const userData = JSON.parse(decodeURIComponent(userDataStr));
          localStorage.setItem("user_data", JSON.stringify(userData));
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      }
      // Redirect to dashboard or home page
      window.location.href = "/dashboard";
    } else {
      // Handle error case
      window.location.href = "/login";
    }
  }

  static logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("auth_state");
    window.location.href = "/login";
  }
  static isAuthenticated() {
    return localStorage.getItem("auth_token") !== null;
  }
  static getUserData() {
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  }
}

export default GoogleAuth;
