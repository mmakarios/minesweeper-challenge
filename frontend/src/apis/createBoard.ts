import { api } from '../constants';

const createBoard = async (rows: number, columns: number, mines: number) => {
  const response = await fetch(api.CREATE_BOARD, { method: 'POST', headers: api.HEADERS, body: JSON.stringify({ rows, columns, mines })});
  if (!response.ok) {
    throw response;
  }
  const responseData = await response.json();
  return responseData;
}

export default createBoard;
