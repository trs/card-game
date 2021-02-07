import React, {Reducer} from 'react';

import { CardModelState } from './models';
import type { PlayerModel } from './models';

export interface PlayersStore {
  players: PlayerModel[];
}

export const initialState: PlayersStore = {
  players: [
    {
      id: 1,
      name: 'Test',
      hand: [
        {
          id: 3,
          x: 5,
          y: 1,
          z: 0,
          state: CardModelState.Hand
        }
      ]
    }
  ]
}
