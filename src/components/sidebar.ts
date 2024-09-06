import { createCustomHtmlElement } from "../utils/domUtils";

export const createSidebar = () => {
  const sidebarContainer = document.querySelector(".sidebar-container");
  const logoContainer = createCustomHtmlElement("div", {
    classes: ["logo-container"],
  });
  sidebarContainer?.appendChild(logoContainer);
  const logo = createCustomHtmlElement("div", {
    classes: ["logo"],
  });
  logoContainer?.appendChild(logo);
};
