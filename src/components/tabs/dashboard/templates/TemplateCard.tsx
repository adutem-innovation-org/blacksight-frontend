import { Badge } from "@/components/badge";
import { Button } from "@/components/form";
import { EmailTemplate } from "@/interfaces";
import { Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import { Loader } from "@/components/progress";

export const TemplateCard = ({ template }: { template: EmailTemplate }) => {
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);
  const hiddenRef = useRef<HTMLDivElement>(null);

  const htmlToImage = async () => {
    if (!hiddenRef.current) return;

    try {
      setLoadingPreview(true);
      setPreviewError(false);

      const canvas = await html2canvas(hiddenRef.current, {
        backgroundColor: "#f6f3f4",
        useCORS: true,
      });
      setPreviewImage(canvas.toDataURL("image/png"));
    } catch (error) {
      setPreviewError(true);
    } finally {
      setLoadingPreview(false);
    }
  };

  useEffect(() => {
    htmlToImage();
  }, []);

  return (
    <div className="bg-white rounded-4xl p-2 flex flex-col gap-4">
      <div
        ref={hiddenRef}
        style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
        dangerouslySetInnerHTML={{ __html: template.html }}
      />
      <div className="h-[230px] rounded-3xl bg-gray-100 overflow-hidden relative border border-gray-300">
        {loadingPreview && <Loader />}
        {!loadingPreview && previewImage && (
          <img
            src={previewImage}
            className="w-full h-full object-cover"
            alt={template.name}
          />
        )}
        {!loadingPreview && previewError && (
          <div className="w-full h-full flex items-center jusitfy-center text-sm font-medium">
            Unable to load preview
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-1.5 p-2">
        <h3 className="font-urbanist font-semibold text-xl">{template.name}</h3>
        <p className="font-sfpro text-ellipsis max-h-[80px] overflow-hidden text-sm leading-relaxed text-gray-500">
          {template.description}
        </p>
        <div className="flex items-center gap-1">
          {template.keywords.slice(0, 4).map((keyword) => (
            <Badge>{keyword}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Button className="rounded-full flex-1 h-12">Edit Template</Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full bg-gray-200 w-12 h-12"
          >
            <Eye />
          </Button>
        </div>
      </div>
    </div>
  );
};
