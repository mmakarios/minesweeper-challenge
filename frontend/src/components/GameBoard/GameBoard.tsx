import { useCallback, useContext, useMemo } from "react";
import { openBox, flagBox } from "../../apis";
import BoxButton from "../BoxButton";
import { BoardContext } from "../Game";
import styles from "./GameBoard.module.scss";

export const GameBoard = () => {
  const { board, onBoardChange } = useContext(BoardContext);

  const onOpenBox = useCallback(
    async (box) => {
      // setAlert("");
      if (!board || !onBoardChange) {
        return;
      }
      let newBoard;
      try {
        newBoard = await openBox(board.id, box);
      } catch (err) {
        // setAlert("Board creation failed.");
      }
      onBoardChange(newBoard);
    },
    [board, onBoardChange]
  );

  const onFlagBox = useCallback(
    async (e, box) => {
      e.preventDefault();
      // setAlert("");

      if (!board || !onBoardChange) {
        return;
      }
      let newBoard;
      try {
        newBoard = await flagBox(board.id, box);
      } catch (err) {
        // setAlert("Board creation failed.");
      }
      onBoardChange(newBoard);
    },
    [board, onBoardChange]
  );

  const renderBoard = useMemo(() => {
    return board?.boxes.map((row, rowIndex) => (
      <div key={"row-" + rowIndex} className={styles.gameboardRow}>
        {row.map((box, columnIndex) => (
          <BoxButton
            onClick={() =>
              onOpenBox(columnIndex + rowIndex * board.boxes[0].length)
            }
            onContextMenu={(e) =>
              onFlagBox(e, columnIndex + rowIndex * board.boxes[0].length)
            }
            disabled={box.state === "opened" || board.status !== 0}
            key={columnIndex + rowIndex * board.boxes[0].length}
            box={box}
          />
        ))}
      </div>
    ));
  }, [board?.boxes, onFlagBox, onOpenBox]);

  return <div className={styles.gameboard}>{board && renderBoard}</div>;
};

export default GameBoard;
