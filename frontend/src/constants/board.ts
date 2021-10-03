export enum BoardStatus {
  Active = 0,
  Won = 1,
  Lost = 2,
}

const board = {
  MIN_ROWS_COLUMNS: 2,
  MAX_ROWS_COLUMNS: 9,
  MIN_MINES: 1,
};

export default board;
