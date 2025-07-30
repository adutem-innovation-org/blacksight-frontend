import { Button } from "@/components/form";
import { CustomEmailEditor } from "@/components/templates";
import { TemplateTabsEnum } from "@/enums";
import { useStore } from "@/hooks";
import { changeTemplateTab } from "@/store";
import { ArrowLeft, Save } from "lucide-react";
import { useRef, useState } from "react";
import { EditorRef } from "react-email-editor";
import { SaveTemplateForm } from "./SaveTemplateForm.tsx";

export const EditorHeader = ({
  goBack,
  saveTemplate,
}: {
  goBack: () => void;
  saveTemplate: () => void;
}) => {
  return (
    <div className="flex justify-between items-center border-b p-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size={"icon"}
          className="rounded-full"
          onClick={goBack}
        >
          <ArrowLeft />
        </Button>
        <p className="font-spfro-medium text-black text-sm">Back</p>
      </div>

      <Button variant={"brand"} className="h-10" onClick={saveTemplate}>
        Save <Save />
      </Button>
    </div>
  );
};

export const EmailTemplateEditorTab = () => {
  const { dispatch } = useStore();
  const emailEditorRef = useRef<EditorRef>(null);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);

  const openTemplateForm = () => setTemplateFormOpen(true);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    let content = "";

    unlayer?.exportHtml((data) => {
      const { html } = data;
      content += html;
    });

    return content;
  };

  const saveTemplate = () => openTemplateForm();

  const goBack = () => {
    dispatch(changeTemplateTab(TemplateTabsEnum.ANALYTICS));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-[12px]">
      <EditorHeader goBack={goBack} saveTemplate={saveTemplate} />
      <div className="flex-1 overflow-hidden">
        <CustomEmailEditor emailEditorRef={emailEditorRef} />
      </div>

      {templateFormOpen && (
        <SaveTemplateForm
          isOpen={templateFormOpen}
          onOpenChange={setTemplateFormOpen}
        />
      )}
    </div>
  );
};
