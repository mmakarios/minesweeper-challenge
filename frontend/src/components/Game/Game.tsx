import { useCallback, useMemo } from "react";
import styles from "./Game.module.scss";
import { BoardContextType, Board } from "../../types";
import { useEffect, useState, createContext } from "react";
import { retrieveBoard, remakeBoard } from "../../apis";
import { useParams, useHistory } from "react-router-dom";
import GameBoard from "../GameBoard";
import Alert from "../Alert";
import Button from "../Button";
import Timer from "../Timer";
import { BoardStatus } from "../../constants";

export const BoardContext = createContext<BoardContextType>({});

export const Game = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<string>("");
  const [board, setBoard] = useState<Board>();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    async function fetchBoard() {
      setIsLoading(true);
      setAlert("");
      let board;
      try {
        board = await retrieveBoard(id);
      } catch (err) {
        setAlert("Error fetching the board!");
      }
      setBoard(board);
      setIsLoading(false);
    }

    fetchBoard();
  }, [id]);

  useEffect(() => {
    if (!board) {
      return;
    }
    if (board.status === BoardStatus.Won) {
      setAlert("Congratulations! You are a Minesweeper!");
      return;
    }
    if (board.status === BoardStatus.Lost) {
      setAlert("Oh no! You lost!");
      return;
    }
  }, [board]);

  const onBackToMenu = useCallback(async () => {
    history.push(``);
  }, [history]);

  const onRetry = useCallback(async () => {
    setIsLoading(true);
    setAlert("");
    let newBoard;
    try {
      newBoard = await remakeBoard(id);
    } catch (err) {
      setIsLoading(false);
      setAlert("Board creation failed.");
      return;
    }
    history.push(`/${newBoard.id}`);
  }, [id, history]);

  const onBoardChange = useCallback(
    (board: Board) => {
      setBoard(board);
    },
    [setBoard]
  );

  const gameEnded = useMemo(() => {
    if (!board) {
      return false;
    }
    return (
      board.status === BoardStatus.Won || board.status === BoardStatus.Lost
    );
  }, [board]);

  return (
    <div className={styles.Game}>
      {board && <Timer startDate={board.started_at} endDate={board.ended_at} />}
      <BoardContext.Provider value={{ board, onBoardChange }}>
        <GameBoard />
      </BoardContext.Provider>
      {alert && (
        <Alert
          className={styles.alert}
          success={board?.status === BoardStatus.Won}
        >
          {alert}
        </Alert>
      )}
      {isLoading && <p>Loading game...</p>}
      {gameEnded && (
        <div className={styles.afterGameActions}>
          <Button onClick={onRetry}>Play again!</Button>
          <Button onClick={onBackToMenu}>Change game settings</Button>
        </div>
      )}
    </div>
  );
};

export default Game;
