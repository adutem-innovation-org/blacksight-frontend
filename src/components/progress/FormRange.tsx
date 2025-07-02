// import React from "react";
// import styled from "styled-components";

// type RangerProps = {
//   totalRange: number;
//   currentRange: number;
// };

// export const FormRange = ({ totalRange, currentRange }: RangerProps) => {
//   return (
//     <Container>
//       {Array.from({ length: totalRange }).map((_, index) => (
//         <React.Fragment key={index}>
//           <Circle filled={index < currentRange} className="font-dmsans">
//             {index + 1}
//           </Circle>
//           {index < totalRange - 1 && <Stroke />}
//         </React.Fragment>
//       ))}
//     </Container>
//   );
// };

// // Styled-components for styling
// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   gap: 0.3rem;
// `;

// const Circle = styled.div<{ filled: boolean }>`
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: bold;
//   color: ${({ filled }) => (filled ? "white" : "var(--brand)")};
//   background-color: ${({ filled }) => (filled ? "var(--brand)" : "white")};
//   border: ${({ filled }) => (filled ? "none" : "2px solid var(--brand)")};
//   transition: color, background-color, 0.4s ease;
// `;

// const Stroke = styled.div`
//   height: 3px;
//   flex: 1;
//   background-color: var(--brand);
//   border-radius: 3px;
// `;
import React from "react";
import styled from "styled-components";

type RangerProps = {
  totalRange: number;
  currentRange: number;
};

export const FormRange = ({ totalRange, currentRange }: RangerProps) => {
  return (
    <Container>
      {Array.from({ length: totalRange }).map((_, index) => (
        <BarContainer key={index}>
          <Bar filled={index < currentRange} />
        </BarContainer>
      ))}
    </Container>
  );
};

// Styled-components for styling
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
`;

const BarContainer = styled.div`
  flex: 1;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const Bar = styled.div<{ filled: boolean }>`
  height: 100%;
  background-color: var(--brand);
  border-radius: 4px;
  width: ${({ filled }) => (filled ? "100%" : "0%")};
  transition: width 0.4s ease;
`;
