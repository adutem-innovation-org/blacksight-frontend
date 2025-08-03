import { cn } from "@/lib/utils";
import styled from "styled-components";

export const DashboardTableLayoutDiv = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
  height: 100%;
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
      className={cn("w-full h-full mt-15 sm:mt-0 p-4", className)}
      {...props}
    />
  );
};

export const DashboardContentContainer = styled.div`
  height: calc(100dvh - 80px);
`;
