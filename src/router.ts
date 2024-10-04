import login from "./presentation/templates/login/index";
import dashboard from "./presentation/templates/dashboard/index";

interface Routes {
  [key: string]: () => string;
}

const routes: Routes = {
  "/": login,
  "/dashboard": dashboard,
};

export const router = async () => {
  const path = window.location.pathname;

  console.log(path);

  const render = routes[path] || routes["/"];

  document.body.innerHTML = render();
};
