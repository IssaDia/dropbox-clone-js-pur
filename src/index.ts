import nunjucks from "nunjucks";
import { router } from "./router";

// Configuration de Nunjucks pour charger les templates
nunjucks.configure("/templates", { autoescape: true, watch: true });

// Gestion du router à chaque changement de page
document.addEventListener("DOMContentLoaded", router);

window.addEventListener("popstate", router);
