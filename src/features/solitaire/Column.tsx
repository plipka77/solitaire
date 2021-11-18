import React from "react";
import { Card } from "./Card";
import { Card as CardModel } from "./solitaire.model";
import "./Column.css";

export function Column(props: { cards: CardModel[], columnNumber: number }) {
  return (
    <div className="column">
      {
        props.cards.map((card, index) => <div className="card" key={card.suit.toString() + card.value.toString()}> <Card card={card} columnNumber={props.columnNumber} rowNumber={index} /> </div>)
      }
    </div>
  );
}