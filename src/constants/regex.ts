export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const secureUrlRegex =
  /^(https:\/\/)([a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/;

export const urlRegex =
  /^(https:\/\/)?([a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$/;
