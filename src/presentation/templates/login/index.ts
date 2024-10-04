import "./index.scss";
import Handlebars from "handlebars";

const loginTemplate: Handlebars.TemplateDelegate = require("./index.hbs");

const login = () => {
  const html = loginTemplate({});
  return html;
};

export default login;
