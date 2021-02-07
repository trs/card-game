import React, {Reducer} from 'react';

import { CardModelState } from './models';
import type { CardModel } from './models';

export interface BoardStore {
  cards: CardModel[];
};

export const initialState: BoardStore = {
  cards: Array.from({length: 20}, (_, i) => ({
    id: i + 1,
    x: 200,
    y: 200 - (i * 1),
    z: i + 1,
    state: CardModelState.Board
  }))
}

export type BoardAction =
  | {type: 'nil'}
  | {type: 'CARD_DRAG_START', id: number}
  | {type: 'CARD_DRAG', id: number, x: number, y: number}
  | {type: 'CARD_DRAG_STOP', id: number}
  | {type: 'CARD_ADD_STATE', id: number, state: CardModelState}
  | {type: 'CARD_REMOVE_STATE', id: number, state: CardModelState}

type BoardReducer = Reducer<BoardStore, BoardAction>;

export const BoardContext = React.createContext<[BoardStore, React.Dispatch<BoardAction>]>([] as unknown as any);

export const BoardProvider: React.FC = ({children}) => {
  const reducer = React.useReducer<BoardReducer>((state, action) => {
    switch (action.type) {
      case 'CARD_DRAG_START': {
        const maxZ = Math.max(...state.cards.map((({z}) => z)));
        return {
          ...state,
          cards: state.cards.map((card) => {
            if (card.id !== action.id) return card;
            return {
              ...card,
              z: maxZ + (card.z === maxZ ? 0 : 1)
            };
          })
        }
      }
      case 'CARD_DRAG': {
        return {
          ...state,
          cards: state.cards.map((card) => {
            if (card.id !== action.id) return card;
            return {
              ...card,
              x: action.x,
              y: action.y
            };
          })
        }
      }
      // case 'CARD_DRAG_STOP': {
      //   return {
      //     ...state,
      //     cards: state.cards.map((card) => {
      //       if (card.id !== action.id) return card;
      //       return {
      //         ...card,
      //       };
      //     })
      //   }
      // }
      case 'CARD_ADD_STATE': {
        return {
          ...state,
          cards: state.cards.map((card) => {
            if (card.id !== action.id) return card;
            return {
              ...card,
              state: card.state | action.state
            };
          })
        }
      }
      case 'CARD_REMOVE_STATE': {
        return {
          ...state,
          cards: state.cards.map((card) => {
            if (card.id !== action.id) return card;
            return {
              ...card,
              state: card.state & ~(action.state)
            };
          })
        }
      }
      default: return state;
    }
  }, initialState);

  return (
    <BoardContext.Provider value={reducer}>
      {children}
    </BoardContext.Provider>
  )
}
