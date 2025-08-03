import { FormGroup } from "@/components/form";
import { FileTypes, KnowledgeBaseSources } from "@/enums";
import { motion } from "framer-motion";

export const DefaultKBForm = ({
  validation,
  onSelectFile,
  removeSelectedFile,
}: {
  validation: any;
  onSelectFile: any;
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
      />

      {validation.values.source === KnowledgeBaseSources.URL && (
        <FormGroup
          type="text"
          groupLabel="URL"
          placeholder="https://example.com"
          size="md"
          name="url"
          validation={validation}
          containerClassName="gap-2 mt-4"
        />
      )}

      {validation.values.source === KnowledgeBaseSources.FILE && (
        <FormGroup
          type="file-input"
          groupLabel={"Upload file"}
          size="md"
          name={"file"}
          validation={validation}
          containerClassName="gap-2 mt-4"
          handleFileChange={onSelectFile}
          accept="text/plain, text/markdown, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
          removeSelectedFile={removeSelectedFile}
          fileTypes={[FileTypes.PDF, FileTypes.DOCX, FileTypes.TXT]}
          maxFileSize={15}
        />
      )}

      {validation.values.source === KnowledgeBaseSources.TEXT_INPUT && (
        <FormGroup
          type="textarea"
          name="text"
          groupLabel="Text Content"
          placeholder="Enter your text content here"
          size="lg"
          validation={validation}
          containerClassName="gap-2 mt-4"
        />
      )}
    </motion.div>
  );
};
