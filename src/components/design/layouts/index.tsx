import styled from "styled-components";

export const DashboardTableLayoutDiv = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;

  @media (min-width: 768px) {
    overflow: hidden;
  }
`;
