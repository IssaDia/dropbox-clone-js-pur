import nunjucks from "nunjucks";

interface Routes {
  [key: string]: string;
}

const routes: Routes = {
  "/": "home.html",
  "/about": "about.html",
};

export function router(): void {
  const path: string = window.location.pathname;
  console.log(path);

  const template: string = routes[path] || "home.html";

  // Données à injecter
  const data = {
    description: "Ce contenu est chargé dynamiquement.",
  };

  // Rendu du template avec les données
  nunjucks.render(template, data, (err: Error | null, res: string | null) => {
    if (err) {
      console.error(err);
      return;
    }
    if (res) {
      console.log(res);

      const rootElement = document.getElementById("root");
      if (rootElement) {
        rootElement.innerHTML = res;
      } else {
        console.error('Élément avec ID "root" introuvable');
      }
    }
  });
}
