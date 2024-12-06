import GoogleAuth from "../../providers/auth/google/GoogleAuth";
import MailAuth from "../../providers/auth/mail/MailAuth";
import "./index.scss";
import Handlebars from "handlebars";
import mainFormPartial from "../partials/login/mainForm.hbs";
import secondMainFormPartial from "../partials/login/secondMainForm.hbs";
import layoutTemplate from "../partials/login/authLayout.hbs";

// Enregistrement des partials Handlebars
Handlebars.registerPartial("mainForm", mainFormPartial);
Handlebars.registerPartial("secondMainForm", secondMainFormPartial);

// Helper Handlebars pour les comparaisons
Handlebars.registerHelper("eq", (a, b) => a === b);

// Compilation du template principal
const layoutCompiled = typeof layoutTemplate === "function" 
  ? layoutTemplate 
  : Handlebars.compile(layoutTemplate);

const login = (): string => {
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
    ],
    buttonsMailData: 
      {
        id: "mail-button-id",
        name: "mail",
        text: "Continue with Email",
        colors: ["#EA4335", "#4285F4", "#FBBC05", "#34A853"],
      },
    
  };

  document.title = data.title;

  const html = layoutCompiled(data);

  // Initialisation des événements après le rendu
  setTimeout(initializeEvents, 0);

  return html;
};

const handleRegister = async (event: Event) => {
 
  
  event.preventDefault();
  const target = event.target as HTMLElement;
  const buttonId = target.id || target.closest("button")?.id || "";

  switch (buttonId) {
    case "google-button-id":
      GoogleAuth.register();
      break;

    case "mail-button-id":
      handleSecondFormSubmit(event);
      break;

    default:
      break;
  }
};

const handleSecondFormSubmit = async (event: Event) => {
  event.preventDefault();

  const mailForm = document.getElementById("mail-form");;
  if (!mailForm) {
    console.error("Le formulaire n'a pas pu être trouvé.");
    return;
  }

  
  const email = (mailForm.querySelector<HTMLInputElement>("#email")?.value || "").trim();
  const firstName = (mailForm.querySelector<HTMLInputElement>("#firstName")?.value || "").trim();
  const lastName = (mailForm.querySelector<HTMLInputElement>("#lastName")?.value || "").trim();
  const password = (mailForm.querySelector<HTMLInputElement>("#password")?.value || "").trim();
  const marketingConsent = mailForm.querySelector<HTMLInputElement>("#marketingConsent")?.checked || false;

  const formData = {
    email,
    firstName,
    lastName,
    password,
    marketingConsent,
  };

  
  

  try {
    const response = await MailAuth.register(formData);
    console.log("Données envoyées avec succès :", response);
  } catch (error) {
    console.error("Erreur lors de l'envoi des données :", error);
  }
};

const handleBack = (dynamicContent: HTMLElement | null) => {
  if (dynamicContent) {
    const mainFormTemplate = Handlebars.partials.mainForm as Handlebars.TemplateDelegate;
    dynamicContent.innerHTML = mainFormTemplate({});
    history.replaceState(null, '', window.location.pathname);
    initializeEvents(); 
  }
};


// Fonction pour initialiser les événements
function initializeEvents(): void {
  const buttons = document.querySelectorAll(".main__button");
  buttons.forEach((button) => {
    button.removeEventListener("click", handleRegister);
    button.addEventListener("click", handleRegister);
  });

  const dynamicContent = document.getElementById("dynamicContent");

  // Gestion du formulaire principal
  const form = document.getElementById("emailForm");
  if (form) {
    form.addEventListener("submit", (event) => handleMainFormSubmit(event, dynamicContent));
  }

  // Gestion du bouton retour
  const backButton = document.getElementById("backButton");
  if (backButton) {
    backButton.addEventListener("click", () => handleBack(dynamicContent));
  }
}

const handleMainFormSubmit = async (event: Event, dynamicContent: HTMLElement | null) => {
  event.preventDefault();

  

  if (dynamicContent) {
    const secondMainFormTemplate = Handlebars.partials.secondMainForm as Handlebars.TemplateDelegate;
    dynamicContent.innerHTML = secondMainFormTemplate({});
   
    
    initializeEvents(); 
};


}

export default login;
