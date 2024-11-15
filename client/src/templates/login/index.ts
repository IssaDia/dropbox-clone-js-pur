// import GoogleAuth from "../../providers/auth/google/GoogleAuth";
// import MailAuth from "../../providers/auth/mail/MailAuth";
// import "./index.scss";
// import Handlebars from "handlebars";

// const loginTemplate: Handlebars.TemplateDelegate = require("./index.hbs");

// const login = () => {

//   const data = {
//     title: "Se connecter",

//     googleButtonId: "google-button-id",
//     appleButtonId: "apple-button-id",
//     mailButtonId: "mail-button-id",
//     handleRegister: handleRegister,
//   };
//   document.title = data.title;

//   const html = loginTemplate(data);
//   setTimeout(initializeEvents, 0);

//   return html;
// };

// const handleRegister = (event: Event): void => {
//   event.preventDefault(); // Prevent default button behavior
//   const target = event.target as HTMLElement;
//   const buttonId = target.id || target.closest("button")?.id || "";

//   switch (buttonId) {
//     case "google-button-id":
//       GoogleAuth.register();
//       break;
//     case "apple-button-id":
//       // Handle Apple login
//       break;
//     case "mail-button-id":
//       MailAuth.register();
//       break;
//     default:
//       break;
//   }
// };

// function initializeEvents(): void {
//   const buttons = document.querySelectorAll(".register-button");
//   buttons.forEach((button) => {
//     // Remove existing listeners to prevent duplicates
//     button.removeEventListener("click", handleRegister);
//     button.addEventListener("click", handleRegister);
//   });
// }

// export default login;

import GoogleAuth from "../../providers/auth/google/GoogleAuth"
import MailAuth from "../../providers/auth/mail/MailAuth";
import "./index.scss";
import { renderTemplate } from "../../handlebars-renderer";

const login = () => {
  const data = {
    title: "Se connecter",
    googleButtonId: "google-button-id",
    appleButtonId: "apple-button-id",
    mailButtonId: "mail-button-id",
    handleRegister: handleRegister,
  };

  document.title = data.title;
  const html = renderTemplate("login", data);
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
