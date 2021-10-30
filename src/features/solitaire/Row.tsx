import React from "react";
import { Card } from "./Card";
import { Card as CardModel, Suit } from "./solitaire.model";
import "./Row.css";

export function Row() {
  const tableauRows: CardModel[][] = [
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
    <div className="row">
      { tableauRows.map(card => <div className="card"> <Card /> </div> ) }
    </div>
  );
}