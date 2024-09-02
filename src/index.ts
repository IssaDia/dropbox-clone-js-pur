import { loadHomePage } from "./pages/home";

const init = () => {
  if (window.location.pathname === "/") {
    loadHomePage();
  }
};

document.addEventListener("DOMContentLoaded", init);
