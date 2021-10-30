import React from "react";
import { Card } from "./Card";
import "./Foundation.css"
import { Card as CardModel, Suit } from "./solitaire.model";

export function Foundation() {
  const cards: CardModel[] = [
    {
      suit: Suit.Club,
      value: 10
    },
    {
      suit: Suit.Heart,
      value: 8
    },
    {
      suit: Suit.Spade,
      value: 5
    },
    {
      suit: Suit.Diamond,
      value: 3
    }
  ]

  return (
    <div className="foundation">
      { cards.map(card => <div className="card"> <Card /> </div>) }
    </div>
  );
}
