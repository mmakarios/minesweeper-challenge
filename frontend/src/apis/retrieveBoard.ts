import { api } from '../constants';

const retrieveBoard = async (id: string) => {
  const response = await fetch(api.RETRIEVE_BOARD + id, { method: 'GET', headers: api.HEADERS});
  if (!response.ok) {
    throw response;
  }
  const responseData = await response.json();
  return responseData;
}

export default retrieveBoard;
