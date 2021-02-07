import React from "react";

import { Game } from "./components/Game";
import { Hand } from "./components/Hand";

import {BoardProvider} from './state/board';

export const App = () => {
  return (
    <BoardProvider>
      <Game />
    </BoardProvider>
  )
}
