import login from "./templates/login/index";
import dashboard from "./templates/dashboard/index";
import authSuccess from "./templates/authSuccess/index";
import withAuth from "./component/withAuth";

interface Routes {
  [key: string]: () => string ;
}

const routes: any = {
  "/": login,
  "/dashboard": withAuth(dashboard),
  "/auth-success": authSuccess,
};

export const router = async () => {
  const path = window.location.pathname;
  const render = routes[path] || routes["/"];
  document.body.innerHTML = render();
};
