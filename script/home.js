document.addEventListener("DOMContentLoaded", () => {
  const loadHomePage = () => {
    console.log("Loading home page");
    const root = document.getElementById("root");
    console.log(root);
  };
  if (window.location.pathname === "/index.html") {
    loadHomePage();
  }
});
