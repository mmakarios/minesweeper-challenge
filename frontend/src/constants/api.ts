const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

const api = {
  HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  CREATE_BOARD: `${BACKEND_URL}/boards/`,
  RETRIEVE_BOARD: `${BACKEND_URL}/boards/`,
  OPEN_BOX: `${BACKEND_URL}/boards/`,
  OPEN_BOX_SUFFIX: `/open/`,
  FLAG_BOX: `${BACKEND_URL}/boards/`,
  FLAG_BOX_SUFFIX: `/flag/`,
};

export default api;
