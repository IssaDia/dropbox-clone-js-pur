import "./index.scss";
import Handlebars from "handlebars";

const dashboardTemplate: Handlebars.TemplateDelegate = require("./index.hbs");

const dashboard = () => {
  const html = dashboardTemplate({});
  return html;
};

export default dashboard;
