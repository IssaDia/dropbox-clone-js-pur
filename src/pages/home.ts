export const loadHomePage = () => {
  console.log("Loading home page");
  const root = document.getElementById("container");
  const header = document.createElement("div");
  if (root) {
    root.appendChild(header);
  }
  header.classList.add("header");
};
