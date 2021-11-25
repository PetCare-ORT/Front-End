import axios from "axios";
import { getRequestHeaders } from "./helpers/requestHeaders";
import Constants from "../lib/Constants";

const domain = Constants.HOST;
const diaryUrl = domain + Constants.DIARY_ENDPOINT

export const getUserDiaryEntry = async () => {
  return getRequestHeaders().then((headers) => {
    return axios.get(diaryUrl, headers);
  });
};

export const addPet = async (diaryEntry) => {
  return getRequestHeaders().then((headers) => {
    return axios.post(diaryUrl, diaryEntry, headers);
  });
};

export const editPet = async (diaryEntryId, updateData) => {
  let endpoint = diaryUrl + `/${diaryEntryId}`;
  return getRequestHeaders().then((headers) => {
    return axios.put(endpoint, updateData, headers);
  });
};

export const deletePet = async (diaryEntryId) => {
  let endpoint = diaryUrl + `/${diaryEntryId}`;
  return getRequestHeaders().then((headers) => {
    return axios.delete(endpoint, headers);
  });
};
