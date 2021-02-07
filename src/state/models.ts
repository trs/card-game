export enum CardModelState {
  Nil = 0,
  Drag = 1 << 0,
  Board,
  Hand
}

export interface CardModel {
  id: number;
  x: number;
  y: number;
  z: number;
  state: CardModelState;
}

export interface PlayerModel {
  id: number;
  name: string;
  hand: CardModel[];
}
