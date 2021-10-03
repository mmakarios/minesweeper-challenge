import { useCallback, useContext, useMemo } from "react";
import { openBox } from "../../apis";
import BoxButton from "../BoxButton";
import { BoardContext } from "../Game";
import styles from "./GameBoard.module.scss";

export const GameBoard = () => {
  const { board, onBoardChange } = useContext(BoardContext);

  const onOpenBox = useCallback(
    async (box) => {
      console.log(`box`, box);
      // setIsLoading(true);
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
      // console.log(`newBoard`, newBoard);
      onBoardChange(newBoard);
      // setIsLoading(false);
      // history.push(`/${newBoard.id}`);
      // console.log(newBoard);
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
            key={"box-" + columnIndex}
            box={box}
          />
        ))}
      </div>
    ));
  }, [board, onOpenBox]);

  return <div className={styles.gameboard}>{board && renderBoard}</div>;
};

export default GameBoard;
