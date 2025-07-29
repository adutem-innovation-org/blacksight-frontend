import { Button } from "@/components/form";
import { CustomEmailEditor } from "@/components/templates";
import { TemplateTabsEnum } from "@/enums";
import { useStore } from "@/hooks";
import { changeTemplateTab } from "@/store";
import { ArrowLeft, Save } from "lucide-react";

export const EditorHeader = ({ goBack }: { goBack: () => void }) => {
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

      <Button variant={"brand"} className="h-10">
        Save <Save />
      </Button>
    </div>
  );
};

export const EmailTemplateEditorTab = () => {
  const { dispatch } = useStore();

  const goBack = () => {
    dispatch(changeTemplateTab(TemplateTabsEnum.ANALYTICS));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-[12px]">
      <EditorHeader goBack={goBack} />
      <div className="flex-1 overflow-hidden">
        <CustomEmailEditor />
      </div>
    </div>
  );
};
