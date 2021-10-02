import styles from "./GameBoard.module.scss";
import { Box } from "../../types";

export const GameBoard = () => {
  const boxes: Box[][] = [
    [
      { value: "1", state: "hidden" },
      { value: "1", state: "visible" },
    ],
    [
      { value: "0", state: "visible" },
      { value: "m", state: "hidden" },
    ],
  ];

  const renderBoard = () => {
    return boxes.map((row) => {
      return (
        <div>
          {row.map((box) => {
            return <span>{box.value}</span>;
          })}
        </div>
      );
    });
  };

  return <div className={styles.GameBoard}>{renderBoard()}</div>;
};

export default GameBoard;
