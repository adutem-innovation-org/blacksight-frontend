import { cn } from "@/lib/utils";
import styled from "styled-components";

export const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(250px, 350px) 1fr;
  gap: 4rem;
`;

export const InfoTitle = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p {...props} className={cn("font-dmsans text-gray-500", className)} />
  );
};

export const InfoData = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p
      {...props}
      className={cn("font-medium font-dmsans text-gray-700", className)}
    />
  );
};
