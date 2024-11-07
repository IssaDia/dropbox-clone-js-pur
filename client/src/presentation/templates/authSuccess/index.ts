import Handlebars from "handlebars";

const authSuccessTemplate: Handlebars.TemplateDelegate = require("./index.hbs");

const authSuccess =   () => {

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
   
    localStorage.setItem("authToken", token);
    
   
    window.location.href = "/dashboard";
    return "";
  } else {
    const html = authSuccessTemplate({
      message: "Authentication successful, but no token found. Redirecting to login."
    });
    
    return html;
  }
}



export default authSuccess;
