import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

export const Card = () => {
  return (
    <Draggable >
      <CardWrapper>
        <CardStyle>
          Card
        </CardStyle>
      </CardWrapper>
    </Draggable>
  )
};

const CardWrapper = styled.div`
  position: absolute;
  :active {
    z-index: 2;
  }
`;

const CardStyle = styled.div`
  width: calc(63px);
  height: calc(88px);
  background-color: #ffffff;
  border: 1px solid #111111;
  border-radius: 4px;

  transition: transform 175ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  cursor: grab;

  // state
  :hover {
    transform:
      scale(1.05, 1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }

  :active {
    cursor: grabbing;
    transform:
      scale(1.25, 1.25)
      perspective(20em)
      rotateX(30deg);

    box-shadow: 0 20px 15px rgba(0, 0, 0, 0.15);
  }
`;
