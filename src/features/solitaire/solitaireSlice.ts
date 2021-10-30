import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Card, Gameboard, SolitaireState } from "./solitaire.model";

const initialState: SolitaireState = {
  gameboard: {
    stock: [],
    foundation: {
      SPADE: [],
      HEART: [],
      CLUB: [],
      DIAMOND: [],
    },
    tableau: new Array<Card[]>(7),
  },
  gameover: false,
};

export const solitaireSlice = createSlice({
  name: "solitaire",
  initialState,
  reducers: {
    setGameboard: (state, action: PayloadAction<Gameboard>) => {
      state.gameboard = action.payload;
      const cardsCompleted: number =
        action.payload.foundation.CLUB.length +
        action.payload.foundation.DIAMOND.length +
        action.payload.foundation.SPADE.length +
        action.payload.foundation.HEART.length;
      state.gameover = cardsCompleted === 56;
    },
  },
});

export const { setGameboard } = solitaireSlice.actions;

export const selectGameboard = (state: RootState) => state.solitaire.gameboard;

export const selectGameover = (state: RootState) => state.solitaire.gameover;

export default solitaireSlice.reducer;
