import { Button } from "../form";

type Props = {
  title: string;
  description: string;
  ctaText: string;
  onClickCta: () => void;
  imageSrc?: string;
};

export const EmptyTableTemplate = ({
  title,
  description,
  ctaText,
  onClickCta,
  imageSrc,
}: Props) => {
  return (
    <div className="bg-white rounded-[12px] flex-1">
      {/* content container */}
      <div className="w-full h-full flex flex-col justify-center items-center text-center gap-4">
        {imageSrc && (
          <div className="w-24 h-24 p-6 rounded-full bg-gray-100">
            <img src={imageSrc} className="object-contain" />
          </div>
        )}
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm max-w-[350px]">{description}</p>
        <Button onClick={onClickCta} className="h-11" variant={"brand"}>
          {ctaText}
        </Button>
      </div>
    </div>
  );
};
