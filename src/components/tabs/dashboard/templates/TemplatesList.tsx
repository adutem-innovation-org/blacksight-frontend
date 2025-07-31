import { EmailTemplate } from "@/interfaces";
import { TemplateCard } from "./TemplateCard";
import { useState } from "react";
import { EmailTemplatePreview } from "./EmailTemplatePreview";

export const TemplatesList = ({
  templates,
}: {
  templates: EmailTemplate[];
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [preview, setPreview] = useState("");

  const openPreview = (preview: string) => {
    if (preview) {
      setPreview(preview);
      setPreviewOpen(true);
    }
  };

  const closePreview = (val: boolean) => {
    setPreview("");
    setPreviewOpen(val);
  };

  return (
    <div className="overflow-hidden flex-1 bg-transparent flex flex-col">
      <div className="h-full overflow-auto grid bg-transparent auto-rows-max grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 md:gap-5 no-scrollbar">
        {templates.map((template) => (
          <TemplateCard template={template} openPreview={openPreview} />
        ))}
      </div>

      <EmailTemplatePreview
        isOpen={previewOpen}
        onOpenChange={closePreview}
        preview={preview}
      />
    </div>
  );
};
