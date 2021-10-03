import { useCallback } from "react";
import styles from "./Game.module.scss";
import { BoardContextType, Board } from "../../types";
import { useEffect, useState, createContext } from "react";
import { retrieveBoard } from "../../apis";
import { useParams } from "react-router-dom";
import GameBoard from "../GameBoard";

export const BoardContext = createContext<BoardContextType>({});

export const Game = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<string>("");
  const [board, setBoard] = useState<Board>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchBoard() {
      console.log(`fetching board`);
      setIsLoading(true);
      setAlert("");
      let board;
      try {
        board = await retrieveBoard(id);
      } catch (err) {
        setAlert("Error fetching the board!");
      }
      console.log("fetch board: ", board);
      setBoard(board);
      setIsLoading(false);
    }

    fetchBoard();
  }, [id]);

  const onBoardChange = useCallback(
    (board: Board) => {
      setBoard(board);
    },
    [setBoard]
  );

  return (
    <div className={styles.Game}>
      {isLoading && <div>Loading game...</div>}
      <BoardContext.Provider value={{ board, onBoardChange }}>
        <GameBoard />
      </BoardContext.Provider>
    </div>
  );
};

export default Game;
