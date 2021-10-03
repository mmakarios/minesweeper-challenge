import { api } from "../constants";

const openBox = async (id: string, box: number) => {
  const response = await fetch(api.OPEN_BOX + id + api.OPEN_BOX_SUFFIX, {
    method: "PATCH",
    headers: api.HEADERS,
    body: JSON.stringify({ box }),
  });
  if (!response.ok) {
    throw response;
  }
  const responseData = await response.json();
  return responseData;
};

export default openBox;
