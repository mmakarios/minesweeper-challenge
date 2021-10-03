import { BoardStatus } from "../constants";

export interface Box {
  value: string;
  state: string;
}

export interface Board {
  id: string;
  boxes: Box[][];
  status: BoardStatus;
}

export interface BoardContextType {
  board?: Board;
  preview?: boolean;
}
