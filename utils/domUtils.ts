export const createElement = (
  tagName: string,
  options?: CreateElementOptions
): HTMLElement => {
  const element = document.createElement(tagName);

  if (options?.classes) {
    element.classList.add(...options.classes);
  }

  if (options?.attributes) {
    for (const [key, values] of Object.entries(options?.attributes)) {
      element.setAttribute(key, values);
    }
  }

  if (options?.content) {
    if (typeof options.content === "string") {
      element.innerHTML = options?.content;
    } else if (options?.content instanceof HTMLElement) {
      element.appendChild(options?.content);
    } else if (Array.isArray(options?.content)) {
      for (let htmlElement of options?.content) {
        element.appendChild(htmlElement);
      }
    }
  }

  return element;
};
