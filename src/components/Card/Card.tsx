import React from "react";
import styled from "styled-components";

export const Card = ({ children }: { children: React.ReactNode }) => {
  const StyledCard = styled.div`
    background-color: #fff;
    border-radius: 5px;
  `;

  return <StyledCard className="p-4">{children}</StyledCard>;
};
