import { KBSourceType, productSourcesWidgetData } from "@/constants";
import { SourceWidget } from "../knowledge-base";

export const UploadProductsWidget = ({
  openForm,
}: {
  openForm: (data: KBSourceType) => void;
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 min-[400px]:grid-cols-[repeat(3,max-content)] gap-1.5">
        {productSourcesWidgetData.map((source) => (
          <SourceWidget data={source} openForm={openForm} />
        ))}
      </div>
    </div>
  );
};
