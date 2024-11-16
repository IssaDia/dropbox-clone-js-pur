// import Handlebars from 'handlebars';
// import mainLayout from './layouts/main.hbs';
// import loginTemplate from './templates/login/index.hbs';
// import dashboardTemplate from './templates/dashboard/index.hbs';
// import authSuccessTemplate from './templates/authSuccess/index.hbs';
// import head from './partials/head.hbs';
// import header from './partials/header.hbs';
// import footer from './partials/footer.hbs';
// import languageSelector from './partials/languageSelector.hbs';
// import socialButton from './partials/socialButton.hbs';
// import loginForm from './partials/loginForm.hbs';
// import privacyLinks from './partials/privacyLinks.hbs';


// Handlebars.registerPartial('head', head);
// Handlebars.registerPartial('header', header);
// Handlebars.registerPartial('footer', footer);
// Handlebars.registerPartial('languageSelector', languageSelector);
// Handlebars.registerPartial('socialButton', socialButton);
// Handlebars.registerPartial('loginForm', loginForm);
// Handlebars.registerPartial('privacyLinks', privacyLinks);

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