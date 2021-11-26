import axios from "axios";
import Constants from "../lib/Constants";

const userUrl = Constants.HOST + Constants.USER_ENDPOINT;

export const registerUser = async (user) => {
  let endpoint = userUrl + "/register";
  return axios.post(endpoint, user);
};

export const login = async (user) => {
  let endpoint = userUrl + "/login";
  return axios.post(endpoint, user);
};
