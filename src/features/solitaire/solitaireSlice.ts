import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Card, Gameboard, MoveCardPayload, SolitaireState, Suit } from "./solitaire.model";
import { isTableauDecendant } from "./solitaire.util";

const initialState: SolitaireState = {
  stock: {
    remaining: [],
    used: []
  },
  foundation: {
    SPADES: [],
    HEARTS: [],
    CLUBS: [],
    DIAMONDS: [],
  },
  tableau: new Array<Card[]>(7),
  gameover: false,
};

export const solitaireSlice = createSlice({
  name: "solitaire",
  initialState,
  reducers: {
    setGameboard: (state, action: PayloadAction<Gameboard>) => {
      state.foundation = action.payload.foundation;
      state.stock = action.payload.stock;
      state.tableau = action.payload.tableau;
      const cardsCompleted: number =
        action.payload.foundation.CLUBS.length +
        action.payload.foundation.DIAMONDS.length +
        action.payload.foundation.SPADES.length +
        action.payload.foundation.HEARTS.length;
      state.gameover = cardsCompleted === 56;
    },
    moveCardTableau: (state, action: PayloadAction<MoveCardPayload>) => {
      const cardFoundationPile: Card[] = state.foundation[action.payload.card.suit];
      const cardColumn: Card[] = state.tableau[action.payload.column];
      const card: Card = action.payload.card;

      // First check if the card can be placed in the foundation
      if (card.value === 1) {
        // Aces can always be placed in the pile
        cardFoundationPile.push(card);
        cardColumn.pop();
        if (cardColumn.length > 0) {
          cardColumn[cardColumn.length - 1].hidden = false;
        }
        return;
      }
      else if (cardFoundationPile !== undefined && cardFoundationPile[cardFoundationPile.length - 1]?.value === action.payload.card.value - 1) {
        cardFoundationPile.push(action.payload.card);
        cardColumn.pop();
        if (cardColumn.length > 0) {
          cardColumn[cardColumn.length - 1].hidden = false;
        }
        return;
      } else {
        // then check within the tableau
        const tableau: Card[][] = state.tableau;
        for (let index = 0; index < tableau.length; ++index) {
          const column: Card[] = tableau[index];
          if (index !== action.payload.column && isTableauDecendant(tableau[index][tableau[index].length - 1], action.payload.card)) {
            const moveElements: Card[] = cardColumn.splice(action.payload.row);
            column.push(...moveElements);
            if (cardColumn.length > 0) {
              cardColumn[cardColumn.length - 1].hidden = false;
            }
            return;
          }
        }
      }
    },
    moveCardStock: (state, action: PayloadAction<number>) => {
      // 0 refers to the face up card and 1 refers to face down
      if (action.payload === 0) {
        const card: Card = state.stock.used[state.stock.used.length - 1];
        // Check the foundation first
        const cardFoundationPile: Card[] = state.foundation[card.suit];
        if (card.value === 1 || cardFoundationPile[cardFoundationPile.length - 1]?.value === card.value - 1) {
          cardFoundationPile.push(state.stock.used.splice(state.stock.used.length - 1, 1)[0]);
          return;
        }
        const tableau: Card[][] = state.tableau;
        for (let i = 0; i < tableau.length; ++i) {
          if (isTableauDecendant(tableau[i][tableau[i].length - 1], card)) {
            tableau[i].push(state.stock.used.splice(state.stock.used.length - 1, 1)[0]);
            return;
          }
        }
        console.error("Tableau: ", tableau);
      } else {
        const card: Card = state.stock.remaining.splice(state.stock.remaining.length - 1, 1)[0];

        // Reset stock if there are no more cards
        if (card === undefined) {
          state.stock.remaining = state.stock.used.splice(0, state.stock.used.length).map(card => {
            return {
              ...card,
              hidden: true
            }
          });
          return;
        }
        card.hidden = false;
        state.stock.used.push(card);
      }
    },
    moveCardFoundation: (state, action: PayloadAction<Suit>) => {
      const tableau: Card[][] = state.tableau;
      const foundationPile: Card[] = state.foundation[action.payload];
      const card: Card = foundationPile[foundationPile.length - 1];

      for (let cardColumn of tableau) {
        if (isTableauDecendant(cardColumn[cardColumn.length - 1], card)) {
          cardColumn.push(foundationPile.splice(foundationPile.length - 1, 1)[0]);
          return;
        }
      }
    }
  },
});

export const { setGameboard, moveCardTableau, moveCardStock, moveCardFoundation } = solitaireSlice.actions;

export const selectTableau = (state: RootState) => state.solitaire.tableau;
export const selectFoundation = (state: RootState) => state.solitaire.foundation;
export const selectStock = (state: RootState) => state.solitaire.stock;
export const selectGameover = (state: RootState) => state.solitaire.gameover;

export default solitaireSlice.reducer;
