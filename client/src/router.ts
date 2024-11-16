import login from "./templates/login/index";
import dashboard from "./templates/dashboard/index";
import authSuccess from "./templates/authSuccess/index";
import withAuth from "./component/withAuth";

interface Routes {
  [key: string]: () => string ;
}

const routes: any = {
  "/": login,
  "/dashboard": withAuth(dashboard),
  "/auth-success": authSuccess,
};

export const router = async () => {
  const path = window.location.pathname;
  const render = routes[path] || routes["/"];
  document.body.innerHTML = render();
};

// import Handlebars from 'handlebars';
// import mainLayout from './layouts/main.hbs';
// import loginTemplate from './templates/login/index.hbs';
// import dashboardTemplate from './templates/dashboard/index.hbs';
// import authSuccessTemplate from './templates/authSuccess/index.hbs';

// // Register partials
// Handlebars.registerPartial('header', require('./partials/header.hbs'));
// Handlebars.registerPartial('footer', require('./partials/footer.hbs'));
// Handlebars.registerPartial('languageSelector', require('./partials/languageSelector.hbs'));
// Handlebars.registerPartial('socialButton', require('./partials/socialButton.hbs'));
// Handlebars.registerPartial('loginForm', require('./partials/loginForm.hbs'));
// Handlebars.registerPartial('privacyLinks', require('./partials/privacyLinks.hbs'));

// export const renderTemplate = (templateName: string, data: any): string => {
//     let template: Handlebars.TemplateDelegate<any>;
//     switch (templateName) {
//         case 'login':
//             template = Handlebars.compile(loginTemplate);
//             break;
//         case 'dashboard':
//             template = Handlebars.compile(dashboardTemplate);
//             break;
//         case 'authSuccess':
//             template = Handlebars.compile(authSuccessTemplate);
//             break;
//         default:
//             template = Handlebars.compile(mainLayout);
//     }
//     return template(data);
// };

// import { renderTemplate } from './handlebars-renderer';
// import withAuth from './component/withAuth';

// type RouteHandler = () => string;


// // Configuration of routes
// const routes: { [key: string]: RouteHandler }  = {
//     "/": () => renderTemplate('login', {
//         title: "Log in or sign up",
//         googleIcon:"",
//         appleIcon: "",
//         language: "Français (France)"
//     }),
//     "/dashboard": withAuth(() => renderTemplate('dashboard', {})),
//     "/auth-success": () => renderTemplate('authSuccess', {}),
// };

// export const router = async () => {
//     const path = window.location.pathname;
//     console.log(path);
    
//     const render = routes[path] || routes["/"];
//     document.body.innerHTML = render();
// };
