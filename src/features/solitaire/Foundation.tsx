import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Card } from "./Card";
import "./Foundation.css"
import { Card as CardModel, Suit } from "./solitaire.model";
import { moveCardFoundation, selectFoundation } from "./solitaireSlice";

export function Foundation() {
  const dispatch = useAppDispatch();
  const foundation: {
    [suit in Suit]: CardModel[]
  } = useAppSelector(selectFoundation);

  const moveFoundationCard = (suit: Suit) => {
    if (foundation[suit] === undefined || foundation[suit].length === 0) {
      return;
    }
    dispatch(moveCardFoundation(suit));
  };
  return (
    <div className="foundation">
      {
        Object.values(Suit).map(suit => {
          return <div onClick={() => moveFoundationCard(suit)} className="card-holder" key={suit.toString()}> {foundation[suit] === undefined || foundation[suit].length === 0 ? null : <Card card={foundation[suit][foundation[suit].length - 1]} expandable={foundation[suit][foundation[suit].length - 1].value !== 1} unclickable={true} />}</div>
        })
      }
    </div>
  );
}
