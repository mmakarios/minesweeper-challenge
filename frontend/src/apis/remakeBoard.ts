import { api } from "../constants";

const remakeBoard = async (id: string) => {
  const response = await fetch(
    api.REMAKE_BOARD + id + api.REMAKE_BOARD_SUFFIX,
    { method: "POST", headers: api.HEADERS }
  );
  if (!response.ok) {
    throw response;
  }
  const responseData = await response.json();
  return responseData;
};

export default remakeBoard;
