import "../styles/index.css";
import Handlebars from "handlebars";
import homeTemplate from "./templates/home.hbs";

interface Routes {
  [key: string]: Handlebars.TemplateDelegate;
}

const routes: Routes = {
  "/": homeTemplate as unknown as Handlebars.TemplateDelegate,
};

export const router = async () => {
  const path = window.location.pathname;

  const template = routes[path] || homeTemplate;

  const html = template({});

  document.body.innerHTML = html;
};

router();
