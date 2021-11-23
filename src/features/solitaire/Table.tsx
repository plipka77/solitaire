import React, { useEffect } from "react";
import { Foundation } from "./Foundation";
import { Stock } from "./Stock";
import { Tableau } from "./Tableau";
import "./Table.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectGameover, setGameboard } from "./solitaireSlice";
import { createGameboard } from "./solitaire.util";
import { Modal } from "@mui/material";

export function Table() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setGameboard(createGameboard()));
  }, []);
  const gameover: boolean = useAppSelector(selectGameover);

  return (
    <div className="game-table">
      <div className="upper-table">
        <Foundation />
        <Stock />
      </div>
      <div className="lower-table">
        <Tableau />
      </div>
      <Modal open={true}>
        <h1>HELLO FROM MODALL</h1>
      </Modal>
    </div>
  );
}
