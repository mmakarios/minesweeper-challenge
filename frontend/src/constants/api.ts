const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

const api = {
  HEADERS: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  CREATE_BOARD: `${BACKEND_URL}/boards/`,
  RETRIEVE_BOARD: `${BACKEND_URL}/boards/`,
}

export default api;
