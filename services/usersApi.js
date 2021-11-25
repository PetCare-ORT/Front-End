import axios from "axios";
import { getRequestHeaders , setRequestHeaders} from "./helpers/requestHeaders";
import Constants from "../lib/Constants";

const userUrl = Constants.HOST + Constants.USER_ENDPOINT

export const registerUser = async () => {
  let endpoint = userUrl + '/register'
  return getRequestHeaders().then((headers) => {
    return axios.get(endpoint, headers);
  });
};

export const addPet = async (user) => {
  let endpoint = userUrl + '/login'
  return setRequestHeaders().then((headers) => {
    return axios.post(endpoint, user, headers);
  });
};

