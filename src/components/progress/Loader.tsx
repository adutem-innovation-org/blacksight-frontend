import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

interface LoaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  type?: string;
  text1?: string;
  text2?: string;
  extrudeChildren?: boolean;
  customLoader?: any;
}

export const Loader = ({
  type = "base",
  text1,
  text2,
  className,
  customLoader,
  extrudeChildren = false,
  ...props
}: LoaderProps) => {
  return (
    <div
      className={cn(
        "w-full h-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-[100000]",
        className
      )}
      {...props}
    >
      <div
        className={cn("flex text-center flex-col items-center", {
          " bg-white p-8 rounded-md drop-shadow-2xl ": extrudeChildren,
        })}
      >
        {customLoader ? (
          customLoader
        ) : (
          <Spinner classNames="h-[40px]" type={type} />
        )}
        {text1 && (
          <h4 className="font-semibold font-lg text-brand mt-2">{text1}</h4>
        )}
        {text2 && (
          <p className="text-sm max-w-[300px] mt-1 font-medium">{text2}</p>
        )}
        {props.children}
      </div>
    </div>
  );
};
