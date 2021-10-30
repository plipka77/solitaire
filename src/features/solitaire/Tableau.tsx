import React from "react";
import { Z_UNKNOWN } from "zlib";
import { useAppDispatch } from "../../app/hooks";
import { Row } from "./Row";
import { Card, Card as CardModel, Gameboard, Suit } from "./solitaire.model";
import { setGameboard } from "./solitaireSlice";
import "./Tableau.css";

export function Tableau() {
  const dispatch = useAppDispatch();
  dispatch(setGameboard(createGameboard()));
  const tableauRows: CardModel[][] = [
    [

    ],
    [

    ],
    [

    ],
    [

    ],
    [
      
    ],
    [
      
    ],
    [
      
    ]
  ];

  return (
    <div className="tableau">
      { tableauRows.map(() => <div className="row"> <Row /> </div>) }
    </div>
  );
}

function createGameboard(): Gameboard {
  const tableau: Card[][]  = [];
  const stock: Card[] = [];
  const deck: Card[] = getDeck();

  // Build the tableau
  for (let i = 0; i < 7; ++i) {
    tableau[i] = [];
    for (let j = 0; j <= i; ++j) {
      const cardToRemove: number = getRandomInt(deck.length);
      const card: Card = deck.splice(cardToRemove, 1)[0];
      tableau[i].push(card);
    }
  }

  // Build the stock
  while (deck.length > 0) {
    const cardToRemove: number = getRandomInt(deck.length);
    const card: Card = deck.splice(cardToRemove, 1)[0];
    stock.push(card);
  }

  return {
    stock,
    tableau,
    foundation: {
      HEART: [],
      SPADE: [],
      DIAMOND: [],
      CLUB: []
    }
  };
}

function getDeck(): Card[] {
  const deck: Card[] = [];
  Object.values(Suit).forEach(suit => {
    for (let i = 1; i <= 13; ++i) {
      deck.push({
        value: i,
        suit
      })
    }
  });
  return deck;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
