import axios from "axios";
import { getRequestHeaders } from "./helpers/requestHeaders";
import Constants from "../lib/Constants";

const diaryUrl = Constants.HOST + Constants.DIARY_ENDPOINT

export const getUserDiaryEntry = async () => {
  return getRequestHeaders().then((headers) => {
    return axios.get(diaryUrl, headers);
  });
};

export const addDiary = async (diaryEntry) => {
  return getRequestHeaders().then((headers) => {
    return axios.post(diaryUrl, diaryEntry, headers);
  });
};

export const editDiary = async (diaryEntryId, updateData) => {
  let endpoint = diaryUrl + `/${diaryEntryId}`;
  return getRequestHeaders().then((headers) => {
    return axios.put(endpoint, updateData, headers);
  });
};

export const deleteDiary = async (diaryEntryId) => {
  let endpoint = diaryUrl + `/${diaryEntryId}`;
  return getRequestHeaders().then((headers) => {
    return axios.delete(endpoint, headers);
  });
};
