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

      const code = urlParams.get("code");
      if (!code) return;
      const response = await fetch(`/api/auth/google/callback?code=${code}`, {
        credentials: "include",
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("auth_token", data.token);
        if (data.user) {
          localStorage.setItem("user_data", JSON.stringify(data.user));
        }
      }
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      window.history.replaceState({}, document.title, "/");
      window.location.reload();
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
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  }
}

export default GoogleAuth;
