import { cn } from "@/lib/utils";
import spinner from "@/assets/images/brand-spinner.gif";
import spinnerPrimary from "@/assets/images/primary-spinner.gif";
import formButtonSpinner from "@/assets/images/white-spinner.gif";

interface SpinnerProps {
  classNames?: string;
  type?: string;
}

const spinnerMap = {
  primary: spinnerPrimary,
  brand: spinner,
  form: formButtonSpinner,
};

export const Spinner = ({ classNames, type = "brand" }: SpinnerProps) => {
  return (
    <div
      data-testid="loader"
      className={cn(`mx-2 max-h-[150px] inline-block my-auto h-6`, classNames)}
    >
      <img
        src={spinnerMap[type as keyof typeof spinnerMap] || spinner}
        className="h-full"
      />
    </div>
  );
};
