export * from "./auth.helpers";
export * from "./get-initials";
export * from "./reminder.helper";
export * from "./file-export.helper";
export * from "./onboard.helper";
export * from "./template.helper";
export * from "./session.helpers";

export const getRandomArrayItem = (elements: Array<any>) => {
  if (elements.length === 0) return null;
  if (elements.length === 1) return elements[0];

  const randomIndex = Math.floor(Math.random() * elements.length);
  return elements[randomIndex];
};

export const resetDocumentElement = () => {
  const tmo = setTimeout(() => {
    document.body.style.pointerEvents = "";
    clearTimeout(tmo);
  }, 300);
};

export const writeTextToClipboard = async (text: string) => {
  return await navigator.clipboard.writeText(text);
};
