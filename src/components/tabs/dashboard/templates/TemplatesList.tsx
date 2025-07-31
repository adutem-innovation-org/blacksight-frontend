import { EmailTemplate } from "@/interfaces";
import { TemplateCard } from "./TemplateCard";

export const TemplatesList = ({
  templates,
}: {
  templates: EmailTemplate[];
}) => {
  return (
    <div className="overflow-hidden flex-1 bg-transparent flex flex-col">
      {/* <h2 className="mb-6 text-xl font-semibold text-gray-700 font-urbanist">
        Your templates
        </h2> */}
      {/* <div className="flex-1 overflow-hidden"> */}
      {/* </div> */}
      <div className="h-full overflow-auto grid bg-transparent auto-rows-max grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 md:gap-5 no-scrollbar">
        {templates.map((template) => (
          <TemplateCard template={template} />
        ))}
      </div>
    </div>
  );
};
