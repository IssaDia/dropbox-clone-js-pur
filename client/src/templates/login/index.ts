import GoogleAuth from "../../providers/auth/google/GoogleAuth";
import MailAuth from "../../providers/auth/mail/MailAuth";
import "./index.scss";
import Handlebars from "handlebars";
import headPartial from "../partials/head.hbs";
import footerPartial from "../partials/footer.hbs";
import loginFormPartial from "../partials/loginForm.hbs";
import headerPartial from "../partials/header.hbs";
import socialButtonPartial from "../partials/socialButton.hbs";

Handlebars.registerPartial('head', headPartial);
Handlebars.registerPartial('footer', footerPartial);
Handlebars.registerPartial('loginForm', loginFormPartial);
Handlebars.registerPartial('header', headerPartial);
Handlebars.registerPartial('socialButton', socialButtonPartial);


const loginTemplate: Handlebars.TemplateDelegate = require("./index.hbs");

const login = () => {

  const data = {
    title: "Se connecter",
    googleButtonId: "google-button-id",
    appleButtonId: "apple-button-id",
    mailButtonId: "mail-button-id",
    handleRegister: handleRegister,
    googleButtonText: "Continue with Google", 
    googleColor1: "#EA4335", 
    googleColor2: "#4285F4", 
    googleColor3: "#FBBC05",  
    googleColor4: "#34A853"  
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
    case "mail-button-id":
      MailAuth.register();
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
