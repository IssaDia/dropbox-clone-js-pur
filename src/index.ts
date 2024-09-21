import "../styles/index.css";
import Handlebars from "handlebars";
import loginTemplate from "./presentation/templates/login/index.hbs";

interface Routes {
  [key: string]: Handlebars.TemplateDelegate;
}

const routes: Routes = {
  "/": loginTemplate as unknown as Handlebars.TemplateDelegate,
};

export const router = async () => {
  const path = window.location.pathname;

  const template = routes[path] || loginTemplate;

  const html = template({});

  document.body.innerHTML = html;
};

router();
