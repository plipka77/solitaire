import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Column } from "./Column";
import { Card } from "./solitaire.model";
import { selectTableau } from "./solitaireSlice";
import "./Tableau.css";

export function Tableau() {
  const tableau: Card[][] = useAppSelector(selectTableau);
  return (
    <div className="tableau">
      {tableau.map((_, index) => <Column key={index} cards={tableau[index]} columnNumber={index} />)}
    </div>
  );
}

