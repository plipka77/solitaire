import React from "react";
import { Card } from "./Card";
import { Card as CardModel } from "./solitaire.model";
import "./Column.css";

export function Column(props: { cards: CardModel[], columnNumber: number }) {
  return (
    <div className="column">
      {
        props.cards.map((card, index) => <Card card={card} expandable={props.cards[index].hidden !== true} columnNumber={props.columnNumber} rowNumber={index} />)
      }
    </div>
  );
}