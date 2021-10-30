import React from "react";
import { Foundation } from "./Foundation";
import { Stock } from "./Stock";
import { Tableau } from "./Tableau";
import "./Table.css";
import { Card } from "./Card";

export function Table() {
  return (
    <div className="game-table">
      <div className="upper-table">
        <Foundation />
        <Stock />
      </div>
      <div className="lower-table">
        <Tableau />
      </div>
    </div>
  );
}
