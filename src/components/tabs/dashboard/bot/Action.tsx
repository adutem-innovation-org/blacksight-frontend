import { Button } from "@/components/form";
import { DropdownComp } from "@/components/popups";
import { kbSources, KBSourceType } from "@/constants";
import { KnowledgeBaseSources } from "@/enums";
import { Plus } from "lucide-react";

export const AddKbAction = ({
  addKB,
}: {
  addKB: (sourceData: KBSourceType) => void;
}) => {
  return (
    <DropdownComp
      Trigger={() => (
        <Button className="h-8 !text-xs px-2.5" type="button">
          Create <Plus />
        </Button>
      )}
      data={[
        {
          placeholder: "Add File",
          onClick: () => {
            const fileSource = kbSources.find(
              (source) => source.source === KnowledgeBaseSources.FILE
            );
            if (!fileSource) return;
            addKB(fileSource);
          },
          Icon: (() => <i className="fi fi-rr-file-upload flex" />) as any,
        },
        {
          placeholder: "Create Text",
          onClick: () => {
            const fileSource = kbSources.find(
              (source) => source.source === KnowledgeBaseSources.TEXT_INPUT
            );
            if (!fileSource) return;
            addKB(fileSource);
          },
          Icon: (() => <i className="fi fi-rr-text flex" />) as any,
        },
        {
          placeholder: "Add URL",
          onClick: () => {
            const fileSource = kbSources.find(
              (source) => source.source === KnowledgeBaseSources.URL
            );
            if (!fileSource) return;
            addKB(fileSource);
          },
          Icon: (() => <i className="fi fi-rr-globe flex" />) as any,
        },
        {
          placeholder: "AI Prompt",
          onClick: () => {
            const fileSource = kbSources.find(
              (source) => source.source === KnowledgeBaseSources.PROMPT
            );
            if (!fileSource) return;
            addKB(fileSource);
          },
          Icon: (() => <i className="fi fi-rr-brain-circuit flex" />) as any,
        },
      ]}
    />
  );
};
