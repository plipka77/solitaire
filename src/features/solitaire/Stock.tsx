import React from "react";
import { Card } from "./Card";
import { Card as CardModel, Suit } from "./solitaire.model";
import "./Stock.css";

export function Stock() {
  const stockCards: CardModel[] = [
    {
      suit: Suit.Club,
      value: 3
    },
    {
      suit: Suit.Heart,
      value: 4
    }
  ];
    
  return (
    <div className="stock">
      { stockCards.map(card => <div className="card"> <Card /> </div> ) }
    </div>
  );
}
