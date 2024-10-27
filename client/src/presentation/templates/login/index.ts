import GoogleAuth from "../../../providers/auth/google/GoogleAuth";
import "./index.scss";
import Handlebars from "handlebars";

const loginTemplate: Handlebars.TemplateDelegate = require("./index.hbs");

const login = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const userStr = urlParams.get("user");

  if (token && userStr) {
    try {
      const user = JSON.parse(decodeURIComponent(userStr));
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_data", JSON.stringify(user));
      window.location.href = "/dashboard";
      return ""; // Return empty string while redirecting
    } catch (error) {
      console.error("Error handling auth callback:", error);
      window.location.href = "/";
      return ""; // Return empty string while redirecting
    }
  }

  if (GoogleAuth.isAuthenticated()) {
    window.location.href = "/dashboard";
    return "";
  }

  const data = {
    title: "Se connecter",

    googleButtonId: "google-button-id",
    appleButtonId: "apple-button-id",
    handleRegister: handleRegister,
  };
  document.title = data.title;

  const html = loginTemplate(data);
  setTimeout(initializeEvents, 0);

  return html;
};

const handleRegister = (event: Event): void => {
  event.preventDefault(); // Prevent default button behavior
  const target = event.target as HTMLElement;
  const buttonId = target.id || target.closest("button")?.id || "";

  switch (buttonId) {
    case "google-button-id":
      GoogleAuth.register();
      break;
    case "apple-button-id":
      // Handle Apple login
      break;
    default:
      break;
  }
};

function initializeEvents(): void {
  const buttons = document.querySelectorAll(".register-button");
  buttons.forEach((button) => {
    // Remove existing listeners to prevent duplicates
    button.removeEventListener("click", handleRegister);
    button.addEventListener("click", handleRegister);
  });
}

export default login;
