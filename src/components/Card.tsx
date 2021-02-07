import React from 'react';
import Draggable from 'react-draggable';
import styled, { css } from 'styled-components';

import { BoardContext } from '../state/board';
import {CardModel, CardModelState} from '../state/models';

export interface CardProps extends CardModel {

}

export const Card: React.FC<CardProps> = (props) => {
  const [, dispatch] = React.useContext(BoardContext);

  return (
    <Draggable
      position={props}
      onStart={(e, data) => {
        dispatch({
          type: 'CARD_DRAG_START',
          id: props.id
        });
        dispatch({
          type: 'CARD_ADD_STATE',
          id: props.id,
          state: CardModelState.Drag
        })
      }}
      onDrag={(e, data) => {
        dispatch({
          type: 'CARD_DRAG',
          id: props.id,
          x: data.x,
          y: data.y
        })
      }}
      onStop={(e, data) => {
        dispatch({
          type: 'CARD_DRAG_STOP',
          id: props.id
        });
        dispatch({
          type: 'CARD_REMOVE_STATE',
          id: props.id,
          state: CardModelState.Drag
        })
      }}
    >
      <CardWrapper z={props.z}>
        <CardStyle state={props.state}>
          <span>ID: {props.id}</span>
          <span>x: {props.x}</span>
          <span>y: {props.y}</span>
          <span>z: {props.z}</span>
        </CardStyle>
      </CardWrapper>
    </Draggable>
  )
};

const CardWrapper = styled.div<{z: number}>`
  position: absolute;

  ${props => props.z && css`
    z-index: ${props.z};
  `}
  :hover, :active {
    z-index: 999;
  }
`;

const CardStyle = styled.div<{state: CardModelState}>`
  --base-width: 63px;
  --base-height: 88px;

  width: calc(var(--base-width) * 1.5);
  height: calc(var(--base-height) * 1.5);
  background-color: #ffffff;
  border: 1px solid #111111;
  border-radius: 4px;

  transition: transform 175ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  cursor: grab;

  display: flex;
  flex-direction: column;

  // state
  :hover:not(:active) {
    outline: 0;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, .5);
  }

  ${props => (props.state & CardModelState.Drag) && css`
    cursor: grabbing;
    transform:
      scale(1.25, 1.25)
      perspective(20em)
      rotateX(30deg);

    box-shadow: 0 20px 15px rgba(0, 0, 0, 0.15);
  `}
`;
