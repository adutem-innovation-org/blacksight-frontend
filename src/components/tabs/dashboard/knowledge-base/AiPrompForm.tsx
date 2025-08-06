import { FormGroup } from "@/components/form";
import { INDUSTRIES } from "@/constants";
import { useStore } from "@/hooks";
import { motion } from "framer-motion";
import React from "react";

const PromptForm = ({ validation }: { validation: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="px-8"
    >
      <FormGroup
        type="text"
        groupLabel="Business name"
        placeholder="Business name"
        size="md"
        name="businessName"
        containerClassName="gap-2 mt-4"
        validation={validation}
      />

      <FormGroup
        type="textarea"
        name="businessDescription"
        groupLabel="Description"
        placeholder="Briefly describe your business"
        size="sm"
        validation={validation}
        containerClassName="gap-2 mt-4"
        maxLength={300}
        inputClassName="h-20 !resize-none !text-sm"
      />

      <FormGroup
        type="select"
        groupLabel="What industry is your business in?"
        size="md"
        name="industry"
        validation={validation}
        containerClassName="gap-2 mt-4"
        options={INDUSTRIES}
      />

      <FormGroup
        type="textarea"
        name="prompt"
        groupLabel="Prompt"
        placeholder="You are a helpful assistant that generates high-quality content. Please provide informative and accurate responses."
        size="sm"
        validation={validation}
        containerClassName="gap-2 mt-4"
        maxLength={1000}
        inputClassName="h-25 !resize-none"
      />
    </motion.div>
  );
};

const KbUploadForm = ({ validation }: { validation: any }) => {
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

      <FormGroup
        type="textarea"
        name="generatedKB"
        groupLabel="Output"
        placeholder="Nothing to show here..."
        size="lg"
        validation={validation}
        containerClassName="gap-2 mt-4"
      />
    </motion.div>
  );
};

export const AiPromptForm = ({
  validation,
  aiPromptValidation,
}: {
  validation: any;
  aiPromptValidation: any;
}) => {
  const { getState } = useStore();
  const { generatedKB } = getState("KnowledgeBase");

  return (
    <React.Fragment>
      {!generatedKB && <PromptForm validation={aiPromptValidation} />}
      {generatedKB && <KbUploadForm validation={validation} />}
    </React.Fragment>
  );
};
