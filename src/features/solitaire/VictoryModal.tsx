import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { createGameboard } from "./solitaire.util";
import { setGameboard } from "./solitaireSlice";
import "./VictoryModal.css";

export function VictoryModal(props: { gameover: boolean }) {
  const dispatch = useAppDispatch();
  const boxStyle: {} = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  const buttonStyle: {} = {
    width: 300
  }

  const onClick = () => {
    dispatch(setGameboard(createGameboard()));
  };

  return (
    <Modal open={props.gameover}>
      <Box sx={boxStyle}>
        <div id="victory-container">
          <h1 id="victory-message">Congratulations! You have won!</h1>
          <Button onClick={() => onClick()} variant="contained" sx={buttonStyle}>New Game</Button>
        </div>
      </Box>
    </Modal>
  );
}