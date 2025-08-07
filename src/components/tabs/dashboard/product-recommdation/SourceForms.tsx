import { FormGroup, FormikValidation } from "@/components/form";
import {
  ApiProductsUpdateInterval,
  ApiSourceAuthMethod,
  FileTypes,
} from "@/enums";
import { motion } from "framer-motion";

export const FileSourceForm = ({
  validation,
  onSelectFile,
  removeSelectedFile,
}: {
  validation: FormikValidation;
  onSelectFile: (e: any) => void;
  removeSelectedFile: (name: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="px-8"
    >
      <FormGroup
        type="text"
        groupLabel="Tag"
        placeholder="A short description/title"
        size="md"
        name="tag"
        validation={validation}
        containerClassName={"gap-2 mt-4"}
        info="Tags are use to quick search for files in the future."
      />
      <FormGroup
        type="file-input"
        groupLabel="Upload Product File"
        size="md"
        name="file"
        validation={validation}
        containerClassName={"gap-2 mt-4"}
        placeholder="A short description/title"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv, application/vnd.ms-excel"
        handleFileChange={onSelectFile}
        removeSelectedFile={removeSelectedFile}
        fileTypes={[
          FileTypes.XLSX,
          FileTypes.CSV,
          FileTypes.XLS,
          FileTypes.TXT,
        ]}
        info="Ensure your file is in the correct format and includes the required columns for best results."
      />
    </motion.div>
  );
};

export const TextSourceForm = ({
  validation,
}: {
  validation: FormikValidation;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="px-8"
    >
      <FormGroup
        type="text"
        groupLabel="Tag"
        placeholder="A short description/title"
        size="md"
        name="tag"
        validation={validation}
        containerClassName={"gap-2 mt-4"}
        info="Tags are use to quick search for files in the future."
      />
      <FormGroup
        type="textarea"
        name="text"
        groupLabel="Text Content"
        placeholder="Enter your text content here"
        size="lg"
        validation={validation}
        containerClassName="gap-2 mt-4"
      />
    </motion.div>
  );
};

export const ApiSourceForm = ({
  validation,
}: {
  validation: FormikValidation;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="px-8"
    >
      <FormGroup
        type="text"
        groupLabel="Tag"
        placeholder="A short description/title"
        size="md"
        name="tag"
        validation={validation}
        containerClassName={"gap-2 mt-4"}
        info="Tags are use to quick search for files in the future."
      />
      <FormGroup
        type="text"
        name="apiUrl"
        groupLabel="API URL"
        placeholder="Enter your API URL here"
        size="md"
        validation={validation}
        containerClassName="gap-2 mt-4"
      />
      <FormGroup
        type="select"
        name="authMethod"
        groupLabel="Auth Method"
        placeholder="Select auth method"
        size="md"
        validation={validation}
        options={Object.values(ApiSourceAuthMethod)}
        defaultValue={ApiSourceAuthMethod.NONE}
        containerClassName="gap-2 mt-4"
      />
      {validation.values.authMethod === ApiSourceAuthMethod.X_API_KEY && (
        <FormGroup
          type="text"
          name="apiKey"
          groupLabel="API Key"
          placeholder="Enter your API Key here"
          size="md"
          validation={validation}
          containerClassName="gap-2 mt-4"
        />
      )}
      {validation.values.authMethod === ApiSourceAuthMethod.BEARER && (
        <FormGroup
          type="text"
          name="bearerToken"
          groupLabel="Bearer Token"
          placeholder="Enter your Bearer Token here"
          size="md"
          validation={validation}
          containerClassName="gap-2 mt-4"
        />
      )}
      {validation.values.authMethod === ApiSourceAuthMethod.BASIC && (
        <>
          <FormGroup
            type="text"
            name="username"
            groupLabel="Username"
            placeholder="Enter your username here"
            size="md"
            validation={validation}
            containerClassName="gap-2 mt-4"
          />
          <FormGroup
            type="password"
            name="password"
            groupLabel="Password"
            placeholder="Enter your password here"
            size="md"
            validation={validation}
            containerClassName="gap-2 mt-4"
          />
        </>
      )}
      <FormGroup
        type="select"
        name="updateInterval"
        groupLabel="Update Interval"
        placeholder="Select update interval"
        size="md"
        validation={validation}
        options={Object.values(ApiProductsUpdateInterval)}
        defaultValue={ApiProductsUpdateInterval.NEVER}
        containerClassName="gap-2 mt-4"
      />
    </motion.div>
  );
};
