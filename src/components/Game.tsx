import React from "react";

import { Card } from "./Card";
import { Hand } from "./Hand";

import {BoardContext} from '../state/board';

export const Game = () => {
  const [board] = React.useContext(BoardContext)

  return (
    <>
      <Hand></Hand>

      {board.cards.map((card) => {
        return <Card {...card} />
      })}
    </>
  )
}
