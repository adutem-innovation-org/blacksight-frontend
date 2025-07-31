import { Button } from "@/components/form";
import { CustomEmailEditor } from "@/components/templates";
import { TemplateTabsEnum } from "@/enums";
import { useStore } from "@/hooks";
import { changeTemplateTab } from "@/store";
import { ArrowLeft, Paperclip, Save } from "lucide-react";
import { useRef, useState } from "react";
import { EditorRef } from "react-email-editor";
import { CreateTemplateForm } from "./CreateTemplateForm";

export const EditorHeader = ({
  goBack,
  saveTemplate,
  saveToDraft,
}: {
  goBack: () => void;
  saveTemplate: () => void;
  saveToDraft: () => void;
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

      <div className={"flex items-center gap-2"}>
        <Button variant={"brand"} className="h-10" onClick={saveTemplate}>
          Save <Save />
        </Button>
        <Button variant={"brand"} className={"h-10"} onClick={saveToDraft}>
          Save to draft <Paperclip />
        </Button>
      </div>
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

    if (!unlayer) {
      throw new Error("Editor is not initialized.");
    }

    return new Promise<{ html: string; design: any }>((resolve) => {
      unlayer.exportHtml((data: any) => {
        const { html: htmlContent, design: emailDesign } = data;
        resolve({ html: htmlContent, design: emailDesign });
      });
    });
  };

  const saveTemplate = () => openTemplateForm();

  const saveToDraft = () => console.log("Saved to draft");

  const goBack = () => {
    dispatch(changeTemplateTab(TemplateTabsEnum.ANALYTICS));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-[12px]">
      <EditorHeader
        goBack={goBack}
        saveTemplate={saveTemplate}
        saveToDraft={saveToDraft}
      />
      <div className="flex-1 overflow-hidden">
        <CustomEmailEditor emailEditorRef={emailEditorRef} />
      </div>

      {templateFormOpen && (
        <CreateTemplateForm
          isOpen={templateFormOpen}
          onOpenChange={setTemplateFormOpen}
          exportHtml={exportHtml}
        />
      )}
    </div>
  );
};
