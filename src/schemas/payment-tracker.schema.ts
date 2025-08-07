import * as yup from "yup";

export const uploadPaymentsFileSchema = yup.object({
  tag: yup.string().required("Please provide tag"),
  file: yup.mixed().required("Please upload a file"),
});
