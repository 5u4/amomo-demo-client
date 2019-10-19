import Axios from "axios";

export const server = Axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
});
