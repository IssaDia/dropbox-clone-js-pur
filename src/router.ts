import login from "./presentation/templates/login/index";
import dashboard from "./presentation/templates/dashboard/index.hbs";

interface Routes {
  [key: string]: () => string;
}

const routes: Routes = {
  "/": login,
};

export const router = async () => {
  const path = window.location.pathname;

  const render = routes[path] || routes["/"];

  document.body.innerHTML = render();
};
