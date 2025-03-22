export const extractClientInitials = (name: string) => {
  const split = name.split(" ");
  return split[0].charAt(0).toUpperCase() + split[1].charAt(0).toUpperCase();
};
