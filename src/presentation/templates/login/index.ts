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
  console.log(mouseEvent.target);
};

function initializeEvents(): void {
  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".register-button");
    buttons.forEach((button) => {
      button.addEventListener("click", handleRegister);
    });
  });
}

export default login;
