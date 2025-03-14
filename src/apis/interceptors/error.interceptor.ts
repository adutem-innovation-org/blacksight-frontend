export const errorInterceptor = (error: any) => {
  let message =
    error?.response?.data?.message ||
    error?.message ||
    error ||
    "An error occurred!";
  let errors = error?.response?.data?.errors || error?.errors || null;
  return Promise.reject({ message, errors });
};
