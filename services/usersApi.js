import axios from "axios";
import { getRequestHeaders } from "./helpers/requestHeaders";
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

export const updateUser = async (userId, userData) => {
  let endpoint = userUrl + `/update/${userId}`;
  return getRequestHeaders().then((headers) => {
    return axios.put(endpoint, userData, headers);
  });
};
