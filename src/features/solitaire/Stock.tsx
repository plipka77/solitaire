import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Card } from "./Card";
import { Stock as StockModel } from "./solitaire.model";
import { moveCardStock, moveCardTableau, selectStock } from "./solitaireSlice";
import "./Stock.css";

export function Stock() {
  const stock: StockModel = useAppSelector(selectStock);
  const dispatch = useAppDispatch();

  const moveStockCard = (position: number) => {
    dispatch(moveCardStock(position));
  };

  return (
    <div className="stock">
      <div className="stock-pile" onClick={() => moveStockCard(0)}>
        {stock.used.length > 0 ? <Card card={stock.used.slice(-1)[0]} unclickable={true} /> : null}
      </div>
      <div className="stock-pile" onClick={() => moveStockCard(1)}>
        {stock.remaining.length > 0 ? <Card card={stock.remaining.slice(-1)[0]} unclickable={true} /> : null}
      </div>
    </div>
  );
}
