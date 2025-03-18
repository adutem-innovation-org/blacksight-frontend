export const config = {
  baseUrl: import.meta.env.VITE_BASE_URL || "https://api.blacksight.co/api/v1",
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
  },
};
