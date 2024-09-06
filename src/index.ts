import "../styles/index.css";
import Handlebars from "handlebars";
import homeTemplate from "./templates/home.hbs";

interface Routes {
  [key: string]: string;
}

const routes: Routes = {
  "/": homeTemplate,
};

export const router = async () => {
  const path = window.location.pathname;
  const template = routes[path] || homeTemplate;

  const data = {
    title: "Dynamic Project Title",
    header: "Dynamic Header Content",
    content: "This content is dynamically loaded.",
    year: new Date().getFullYear(),
  };

  const compiledTemplate = Handlebars.compile(template);
  const html = compiledTemplate(data);

  document.body.innerHTML = html;
};
