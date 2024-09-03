import { createCustomHtmlElement } from "../../utils/domUtils";

export const appLayout = () => {
  const root = document.getElementById("root");
  const container = createCustomHtmlElement("div", { classes: ["container"] });
  root?.appendChild(container);
  const sidebar = createCustomHtmlElement("div", { classes: ["sidebar"] });
  container?.appendChild(sidebar);
  const navbar = createCustomHtmlElement("div", { classes: ["navbar"] });
  const main = createCustomHtmlElement("div", { classes: ["main"] });
  const mainContent = createCustomHtmlElement("div", {
    classes: ["main-content"],
    content: [navbar, main],
  });
  container?.appendChild(mainContent);
};
