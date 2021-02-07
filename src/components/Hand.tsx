import React from "react";
import styled from 'styled-components';

export const Hand: React.FC = ({children}) => {
  return (
    <HandContainer>
      {children}
    </HandContainer>
  )
}

const HandContainer = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  box-sizing: border-box;

  border: 1px solid red;
`;
