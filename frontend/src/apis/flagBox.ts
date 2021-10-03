import { api } from "../constants";

const flagBox = async (id: string, box: number) => {
  const response = await fetch(api.FLAG_BOX + id + api.FLAG_BOX_SUFFIX, {
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

export default flagBox;
