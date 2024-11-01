import login from "./presentation/templates/login/index";
import dashboard from "./presentation/templates/dashboard/index";
import authSuccess from "./presentation/templates/authSuccess/index";

interface Routes {
  [key: string]: () => string ;
}

const routes: Routes = {
  "/": login,
  "/dashboard": dashboard,
  "/auth-success": authSuccess,
};

export const router = async () => {
  const path = window.location.pathname;
  const render = routes[path] || routes["/"];
  document.body.innerHTML = render();
};
