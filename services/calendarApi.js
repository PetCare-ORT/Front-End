import axios from "axios";
import { getRequestHeaders } from "./helpers/requestHeaders";
import Constants from "../lib/Constants";

const calendarEntryUrl = Constants.HOST + Constants.CALENDAR_ENDPOINT;

export const getUserCalendarEntries = async () => {
  return getRequestHeaders().then((headers) => {
    return axios.get(calendarEntryUrl, headers);
  });
};

export const addCalendarEntry = async (calendarEntry) => {
  return getRequestHeaders().then((headers) => {
    return axios.post(calendarEntryUrl, calendarEntry, headers);
  });
};

export const editCalendarEntry = async (calendarEntryId, updateData) => {
  let endpoint = calendarEntryUrl + `/${calendarEntryId}`;
  return getRequestHeaders().then((headers) => {
    return axios.put(endpoint, updateData, headers);
  });
};

export const deleteCalendarEntry = async (calendarEntryId) => {
  let endpoint = calendarEntryUrl + `/${calendarEntryId}`;
  return getRequestHeaders().then((headers) => {
    return axios.delete(endpoint, headers);
  });
};
