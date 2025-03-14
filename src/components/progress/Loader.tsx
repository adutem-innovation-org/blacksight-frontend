import { Spinner } from "./Spinner";

interface LoaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  type?: string;
}

export const Loader = ({ type = "base", ...props }: LoaderProps) => {
  return (
    <div
      className="w-full h-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-[100000]"
      {...props}
    >
      <div className="">
        <Spinner classNames="h-[40px]" type={type} />
      </div>
    </div>
  );
};
