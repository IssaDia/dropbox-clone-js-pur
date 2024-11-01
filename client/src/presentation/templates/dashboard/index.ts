import "./index.scss";
import Handlebars from "handlebars";

const dashboardTemplate: Handlebars.TemplateDelegate = require("./index.hbs");

const dashboard = () => {
  const token = localStorage.getItem("authToken");
  
  const html = dashboardTemplate({});

  if (token) {

    return html;
  }

  else {
    window.location.href = "/"
    return ""
  }
  
};

export default dashboard;
