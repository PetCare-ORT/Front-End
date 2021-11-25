import axios from "axios";
import { getRequestHeaders } from "./helpers/requestHeaders";
import Constants from "../lib/Constants";

const reminderUrl = Constants.HOST + Constants.REMINDER_ENDPOINT

export const getUserReminder = async () => {
  return getRequestHeaders().then((headers) => {
    return axios.get(reminderUrl, headers);
  });
};

export const addReminder = async (reminder) => {
  return getRequestHeaders().then((headers) => {
    return axios.post(reminderUrl, reminder, headers);
  });
};

export const editReminder = async (reminderId, updateData) => {
  let editReminderEnpoint = reminderUrl+`/${reminderId}`;
  return getRequestHeaders().then((headers) => {
    return axios.put(editReminderEnpoint, updateData, headers);
  });
};

export const deleteReminder = async (reminderId) => {
  let deleteReminderDndpoint = reminderUrl+ `/${reminderId}`;
  return getRequestHeaders().then((headers) => {
    return axios.delete(deleteReminderDndpoint, headers);
  });
};
