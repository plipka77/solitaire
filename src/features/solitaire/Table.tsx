import React, { useEffect } from "react";
import { Foundation } from "./Foundation";
import { Stock } from "./Stock";
import { Tableau } from "./Tableau";
import "./Table.css";
import { useAppDispatch } from "../../app/hooks";
import { setGameboard } from "./solitaireSlice";
import { createGameboard } from "./solitaire.util";

export function Table() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setGameboard(createGameboard()));
  }, []);

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
