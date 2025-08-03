import { KnowledgeBaseSources } from "@/enums";

export type KBSourceType = {
  source: KnowledgeBaseSources;
  label: string;
  iconClass: string;
  description: string;
};

export const kbSources: KBSourceType[] = [
  {
    source: KnowledgeBaseSources.FILE,
    label: "Add File",
    iconClass: "fi fi-rr-file-upload",
    description:
      "Upload a file (PDF, Word, or text) to extract and add its content to your knowledge base.",
  },
  {
    source: KnowledgeBaseSources.TEXT_INPUT,
    label: "Create Text",
    iconClass: "fi fi-rr-text",
    description:
      "Write or paste your own custom text. Useful for adding notes or summaries manually.",
  },
  {
    source: KnowledgeBaseSources.URL,
    label: "Add URL",
    iconClass: "fi fi-rr-globe",
    description:
      "Enter a web link (URL). We'll fetch and analyze the page content for your knowledge base.",
  },
  {
    source: KnowledgeBaseSources.PROMPT,
    label: "AI Prompt",
    iconClass: "fi fi-rr-brain-circuit",
    description:
      "Type a prompt or question. AI will generate relevant content to enrich your knowledge base.",
  },
];
