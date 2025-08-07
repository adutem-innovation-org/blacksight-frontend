import { HowItWorks } from "./HowItWorks";

export const ProductRecommenderTabHeader = () => {
  return (
    <header>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tighter text-[#0f0f10]">
          Product Sources
        </h1>
        <p className="text-sm">
          Manage your uploaded product data files — including plans, packages,
          and subscriptions — used to power personalized recommendations.
        </p>
        <HowItWorks />
      </div>
    </header>
  );
};
