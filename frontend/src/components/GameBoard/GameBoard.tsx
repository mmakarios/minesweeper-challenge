import { useContext, useMemo } from "react";
import { BoardContext } from "../Game";
import styles from "./GameBoard.module.scss";

export const GameBoard = () => {
  const { board } = useContext(BoardContext);

  const renderBoard = useMemo(() => {
    return board?.boxes.map((row, index) => (
      <div key={"row-" + index}>
        {row.map((box, index) => (
          <span key={"box-" + index}>{box.value}</span>
        ))}
      </div>
    ));
  }, [board]);

  return <div className={styles.GameBoard}>{board && renderBoard}</div>;
};

export default GameBoard;
