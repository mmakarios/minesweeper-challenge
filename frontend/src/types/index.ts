import { BoardStatus } from "../constants";

export interface Box {
  value: string;
  state: string;
}

export interface Board {
  id: string;
  boxes: Box[][];
  status: BoardStatus;
  started_at: string;
  ended_at?: string;
}

export interface BoardContextType {
  board?: Board;
  onBoardChange?(board: Board): void;
  preview?: boolean;
}
