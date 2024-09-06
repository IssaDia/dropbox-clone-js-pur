import { createCustomHtmlElement } from "../../utils/domUtils";
import { createSidebar } from "../../components/sidebar";
import { createLogo } from "../../components/logo";

export const appLayout = (): void => {
  const root = document.getElementById("root");
  const container = createCustomHtmlElement("div", {
    classes: ["container"],
  });
  root?.appendChild(container);
  const sidebarContainer = createCustomHtmlElement("div", {
    classes: ["sidebar-container"],
  });
  container?.appendChild(sidebarContainer);
  createSidebar();
  // createLogo();
  const navbar = createCustomHtmlElement("div", { classes: ["navbar"] });
  const main = createCustomHtmlElement("div", { classes: ["main"] });
  const mainContent = createCustomHtmlElement("div", {
    classes: ["main-content"],
    content: [navbar, main],
  });
  container?.appendChild(mainContent);
};
