export * from "./auth.helpers";
export * from "./get-initials";
export * from "./reminder.helper";
export * from "./file-export.helper";

export const getRandomArrayItem = (elements: Array<any>) => {
  if (elements.length === 0) return null;
  if (elements.length === 1) return elements[0];

  const randomIndex = Math.floor(Math.random() * elements.length);
  return elements[randomIndex];
};

export const resetDocumentElement = () => {
  let tmo = setTimeout(() => {
    document.body.style.pointerEvents = "";
    clearTimeout(tmo);
  }, 100);
};
