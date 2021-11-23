import React from "react";
import { useAppDispatch } from "../../app/hooks";
import "./Card.css";
import { Card as CardModel } from "./solitaire.model";
import { getCardImageFile } from "./solitaire.util";
import { moveCardTableau } from "./solitaireSlice";

export function Card(props: { card: CardModel, columnNumber?: number, rowNumber?: number, unclickable?: boolean }) {
  const dispatch = useAppDispatch();
  const images = require.context('./cards', true);
  const img = props.card === undefined || props.card.hidden ? images("./card_back.png").default : images(`./${getCardImageFile(props.card)}`).default;
  return (
    <div className="card" onClick={() => { if (!props.card.hidden && props.unclickable !== true) dispatch(moveCardTableau({ column: props.columnNumber || 0, row: props.rowNumber || 0 })) }}>
      <img src={img} alt="The Card" className={"card-image" + (!props.card.hidden ? " visible" : "")} />
    </div>
  );
}

