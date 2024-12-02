import GoogleAuth from "../../providers/auth/google/GoogleAuth";
import MailAuth from "../../providers/auth/mail/MailAuth";
import "./index.scss";
import Handlebars from "handlebars";
import mainFormPartial from "../partials/login/mainForm.hbs";
import secondMainFormPartial from "../partials/login/secondMainForm.hbs";
import layoutTemplate from "../partials/login/authLayout.hbs";


Handlebars.registerPartial('mainForm', mainFormPartial);

Handlebars.registerPartial('secondMainForm', secondMainFormPartial);
Handlebars.registerHelper('eq', (a, b) => a === b);

const layoutCompiled = typeof layoutTemplate === 'function' 
  ? layoutTemplate 
  : Handlebars.compile(layoutTemplate);


const login = () => {

  const data = {
    title: "Se connecter",
    googleButtonId: "google-button-id",
    appleButtonId: "apple-button-id",
    mailButtonId: "mail-button-id",
   
    buttonsData: [
      {
        id: "google-button-id",
        name: "google",
        text: "Continue with Google",
        colors: ["#EA4335", "#4285F4", "#FBBC05", "#34A853"], 
        
      },
      // {
      //   id: "apple-button-id",
      //   name: "apple",
      //   text: "Continue with Apple",
      //   colors: ["#000000"], 
      // },
    
    ],
  };
  document.title = data.title;

  const html = layoutCompiled(data);

  setTimeout(initializeEvents, 0);

  return html;
};

const handleRegister =  (event: Event) => {
  event.preventDefault();
  const target = event.target as HTMLElement;
  const buttonId = target.id || target.closest("button")?.id || "";

  switch (buttonId) {
    case "google-button-id":
       GoogleAuth.register();
      break;
    // case "apple-button-id":
    //   // Handle Apple login
    //   break;
    // case "mail-button-id":
    //   MailAuth.register();
    //   break;
    default:
      break;
  }
};

(window as any).handleRegister = handleRegister;

let submitHandler: ((event: Event) => void) | null = null;
let backHandler: (() => void) | null = null;

function initializeEvents(): void {
   // Clear previous handlers if they exist
   if (submitHandler) {
     const form = document.getElementById("emailForm");
     form?.removeEventListener('submit', submitHandler);
   }
   
   if (backHandler) {
     const backButton = document.getElementById("backButton");
     backButton?.removeEventListener('click', backHandler);
   }

   // Social buttons event listeners
   const buttons = document.querySelectorAll(".main__button");
   buttons.forEach((button) => {
     // Remove all existing click listeners first
     button.removeEventListener("click", handleRegister);
     button.addEventListener("click", handleRegister);
   });

   const form = document.getElementById("emailForm");
   const backButton = document.getElementById("backButton");
   const dynamicContent = document.getElementById("dynamicContent");

   // Create new submit handler
   submitHandler = (event: Event) => {
     event.preventDefault();
     
     if (dynamicContent) {
       const secondMainFormTemplate = Handlebars.partials.secondMainForm as Handlebars.TemplateDelegate;
       dynamicContent.innerHTML = secondMainFormTemplate({});
       
       // Re-initialize events after content change
       initializeEvents();
     }
   };

   // Create new back handler
   backHandler = () => {
     if (dynamicContent) {
       const mainFormTemplate = Handlebars.partials.mainForm as Handlebars.TemplateDelegate;
       dynamicContent.innerHTML = mainFormTemplate({});
       
       // Remove hash from URL
       history.replaceState(null, '', window.location.pathname);
       
       // Re-initialize events after content change
       initializeEvents();
     }
   };

   // Add new event listeners with null checks
   if (form && submitHandler) {
     form.addEventListener('submit', submitHandler);
   }

   if (backButton && backHandler) {
     backButton.addEventListener('click', backHandler);
   }

   document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector<HTMLFormElement>(".registration-form__form");
    
    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
  
        // Récupérer les données du formulaire
        const email = (document.querySelector<HTMLInputElement>("#email")?.value || "").trim();
        const firstName = (document.querySelector<HTMLInputElement>("#firstName")?.value || "").trim();
        const lastName = (document.querySelector<HTMLInputElement>("#lastName")?.value || "").trim();
        const password = (document.querySelector<HTMLInputElement>("#password")?.value || "").trim();
        const marketingConsent = document.querySelector<HTMLInputElement>("#marketingConsent")?.checked || false;
  
        // Créer un objet contenant les données du formulaire
        const formData = {
          email,
          firstName,
          lastName,
          password,
          marketingConsent,
        };
  
        // Transmettre les données à votre méthode MailAuth.register()
        try {
          const response = await MailAuth.register(formData);
          console.log("Données envoyées avec succès :", response);
        } catch (error) {
          console.error("Erreur lors de l'envoi des données :", error);
        }
      });
    }
  });
  
}

export default login;
