import { loadHomePage } from "./pages/home";
import { appLayout } from "./pages/layout/layout";
import "../styles/index.css";

const init = () => {
  if (window.location.pathname === "/") {
    appLayout();
    loadHomePage();
  }
};

document.addEventListener("DOMContentLoaded", init);
