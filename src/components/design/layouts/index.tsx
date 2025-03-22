import { cn } from "@/lib/utils";
import styled from "styled-components";

export const DashboardTableLayoutDiv = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  // overflow: auto;
  overflow: scroll;
  height: 100%;

  // @media (min-width: 768px) {
  //   overflow: hidden;
  // }
`;

export const DashboardContent = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  return (
    <DashboardContentContainer
      className={cn(
        "w-full h-max mt-20 sm:mt-0 p-4 flex flex-col relative",
        className
      )}
      {...props}
    />
  );
};

export const DashboardContentContainer = styled.div`
  // @media screen and (min-width: 640px) {
  //   height: calc(100dvh - 80px);
  // }
`;
