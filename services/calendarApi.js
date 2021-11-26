import axios from "axios";
import { getRequestHeaders } from "./helpers/requestHeaders";
import Constants from "../lib/Constants";

const calendarEntryUrl = Constants.HOST + Constants.CALENDAR_ENDPOINT

export const getUserCalendarEntries = async () => {
  return getRequestHeaders().then((headers) => {
    return axios.get(calendarEntryUrl, headers);
  });
};

export const addCalendarEntries = async (calendarEntries) => {
  return getRequestHeaders().then((headers) => {
    return axios.post(calendarEntryUrl, appointment, headers);
  });
};

export const editAppointment = async (calendarEntriesId, updateData) => {
  let endpoint = calendarEntryUrl + `/${calendarEntriesId}`;
  return getRequestHeaders().then((headers) => {
    return axios.put(endpoint, updateData, headers);
  });
};

export const deleteAppointment = async (calendarEntriesId) => {
  let endpoint = calendarEntryUrl + `/${calendarEntriesId}`;
  return getRequestHeaders().then((headers) => {
    return axios.delete(endpoint, headers);
  });
};
