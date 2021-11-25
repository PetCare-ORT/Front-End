import axios from "axios";
import { getRequestHeaders } from "./helpers/requestHeaders";
import Constants from "../lib/Constants";

const appointmentUrl = Constants.HOST + Constants.APPOINTMENT_ENDPOINT

export const getUserPets = async () => {
  return getRequestHeaders().then((headers) => {
    return axios.get(appointmentUrl, headers);
  });
};

export const addPet = async (appointment) => {
  return getRequestHeaders().then((headers) => {
    return axios.post(appointmentUrl, appointment, headers);
  });
};

export const editPet = async (appointmentId, updateData) => {
  let endpoint = appointmentUrl + `/${appointmentId}`;
  return getRequestHeaders().then((headers) => {
    return axios.put(endpoint, updateData, headers);
  });
};

export const deletePet = async (petId) => {
  let endpoint = appointmentUrl + `/api/pets/${petId}`;
  return getRequestHeaders().then((headers) => {
    return axios.delete(endpoint, headers);
  });
};
