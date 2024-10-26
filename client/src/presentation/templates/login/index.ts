import GoogleAuth from "../../../providers/auth/google/GoogleAuth";
import "./index.scss";
import Handlebars from "handlebars";

const loginTemplate: Handlebars.TemplateDelegate = require("./index.hbs");

const login = () => {
  const data = {
    title: "Se connecter",

    googleButtonId: "google-button-id",
    appleButtonId: "apple-button-id",
    handleRegister: handleRegister,
  };
  document.title = data.title;

  const html = loginTemplate(data);
  initializeEvents();

  return html;
};

const handleRegister = (event: Event): void => {
  const mouseEvent = event as MouseEvent;
  const target = mouseEvent.target as HTMLButtonElement;
  switch (target.id) {
    case "google-button-id":
      GoogleAuth.register();

      break;
    case "apple-button-id":
      break;
    default:
      break;
  }
};

function initializeEvents(): void {
  document.addEventListener("DOMContentLoaded", () => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      GoogleAuth.handleAuthCallback();
    }

    const buttons = document.querySelectorAll(".register-button");
    buttons.forEach((button) => {
      button.addEventListener("click", handleRegister);
    });
  });
}

export default login;
