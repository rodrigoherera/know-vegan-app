import axios from "axios";

import environment from "../../../environment";

const apiUrl = environment.API_URL;
const apiTimeOut = environment.API_TIMEOUT;

const instance = axios.create({
  baseURL: `${apiUrl}/v1/`,
  timeout: apiTimeOut, // Set timeout to 5 seconds
  /*   headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }, */
});

export default instance;
