import GoogleAuth from "../../providers/auth/google/GoogleAuth";
import MailAuth from "../../providers/auth/mail/MailAuth";
import "./index.scss";
import Handlebars from "handlebars";
import headPartial from "../partials/login/head.hbs";
import footerPartial from "../partials/login/footer.hbs";
import mainFormPartial from "../partials/login/mainForm.hbs";
import headerPartial from "../partials/login/header.hbs";
import socialButtonPartial from "../partials/login/socialButton.hbs";
import secondMainFormPartial from "../partials/login/secondMainForm.hbs";
import layoutTemplate from "../partials/login/layout.hbs";


Handlebars.registerPartial('head', headPartial);
Handlebars.registerPartial('footer', footerPartial);
Handlebars.registerPartial('mainForm', mainFormPartial);
Handlebars.registerPartial('header', headerPartial);
Handlebars.registerPartial('socialButton', socialButtonPartial);
Handlebars.registerPartial('secondMainForm', secondMainFormPartial);
Handlebars.registerHelper('eq', (a, b) => a === b);

console.log("Partiels enregistrés :", Object.keys(Handlebars.partials));

const layoutCompiled = Handlebars.compile(layoutTemplate);


console.log(socialButtonPartial);



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

function initializeEvents(): void {
  const buttons = document.querySelectorAll(".main__button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => handleRegister(event));
  });

  const form = document.getElementById("emailForm");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    
    
    const dynamicContent = document.getElementById("dynamicContent");
    console.log(dynamicContent);
    
    if (dynamicContent) {
      const secondMainFormTemplate = Handlebars.partials.secondMainForm as Handlebars.TemplateDelegate;
      dynamicContent.innerHTML = secondMainFormTemplate({});
     
    }
    document.getElementById("backButton")?.addEventListener("click", () => {
      if (dynamicContent) {
        const mainFormTemplate = Handlebars.partials.mainForm as Handlebars.TemplateDelegate;
        dynamicContent.innerHTML = mainFormTemplate({});
        initializeEvents(); 
      }
    });
  
  })
}

export default login;
