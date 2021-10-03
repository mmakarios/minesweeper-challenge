import React, { useState, useCallback } from "react";
import Slider from "../Slider";
import Button from "../Button";
import Alert from "../Alert";
import { createBoard } from "../../apis";
import { board as constants } from "../../constants";
import styles from "./Menu.module.scss";
import { useHistory } from "react-router-dom";

export const Menu = () => {
  const [rows, setRows] = useState<number>(5);
  const [columns, setColumns] = useState<number>(5);
  const [mines, setMines] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<string>("");
  const history = useHistory();

  const isValidRowColumnInput = useCallback((input: number | typeof NaN) => {
    return (
      !isNaN(input) &&
      input >= constants.MIN_ROWS_COLUMNS &&
      input <= constants.MAX_ROWS_COLUMNS
    );
  }, []);

  const onRowsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newRows = parseInt(event.target.value);
      if (!isValidRowColumnInput(newRows)) {
        return;
      }
      setRows(newRows);
      if (mines >= newRows * columns) {
        setMines(newRows * columns - 1);
      }
    },
    [isValidRowColumnInput, columns, mines]
  );

  const onColumnsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newColumns = parseInt(event.target.value);
      if (!isValidRowColumnInput(newColumns)) {
        return;
      }
      setColumns(newColumns);
      if (mines >= newColumns * rows) {
        setMines(newColumns * rows - 1);
      }
    },
    [isValidRowColumnInput, rows, mines]
  );

  const onMinesChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newMines = parseInt(event.target.value);
      if (
        isNaN(newMines) ||
        newMines < constants.MIN_MINES ||
        newMines >= rows * columns
      ) {
        return;
      }
      setMines(newMines);
    },
    [rows, columns]
  );

  const onCreate = useCallback(async () => {
    setIsLoading(true);
    setAlert("");
    let newBoard;
    try {
      newBoard = await createBoard(rows, columns, mines);
    } catch (err) {
      setAlert("Board creation failed.");
    }
    setIsLoading(false);
    history.push(`/${newBoard.id}`);
    console.log(newBoard);
  }, [rows, columns, mines, history]);

  return (
    <div className={styles.Menu}>
      {alert && <Alert error={true}>{alert}</Alert>}
      <div className={styles.settings}>
        <div className={styles.setting}>
          <p>
            <span>Rows: </span>
            {rows}
          </p>
          <Slider
            onChange={onRowsChange}
            min={constants.MIN_ROWS_COLUMNS}
            max={constants.MAX_ROWS_COLUMNS}
            value={rows}
          />
        </div>
        <div className={styles.setting}>
          <p>
            <span>Columns: </span>
            {columns}
          </p>
          <Slider
            onChange={onColumnsChange}
            min={constants.MIN_ROWS_COLUMNS}
            max={constants.MAX_ROWS_COLUMNS}
            value={columns}
          />
        </div>
        <div className={styles.setting}>
          <p>
            <span>Mines: </span>
            {mines}
          </p>
          <Slider
            onChange={onMinesChange}
            min={constants.MIN_MINES}
            max={rows * columns - 1}
            value={mines}
          />
        </div>
      </div>
      <Button
        onClick={onCreate}
        disabled={isLoading}
        className={styles.createButton}
      >
        Start playing!
      </Button>
    </div>
  );
};

export default Menu;
