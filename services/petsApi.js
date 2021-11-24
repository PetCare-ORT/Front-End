import axios from "axios";
import { getRequestHeaders } from "./helpers/requestHeaders";
import Constants from "../lib/Constants";

const domain = Constants.HOST;

export const getUserPets = async () => {
  const endpoint = domain + "/api/pets";
  return getRequestHeaders().then((headers) => {
    return axios.get(endpoint, headers);
  });
};

export const addPet = async (pet) => {
  const endpoint = domain + "/api/pets";
  return getRequestHeaders().then((headers) => {
    return axios.post(endpoint, pet, headers);
  });
};

export const editPet = async (petId, updateData) => {
  const endpoint = domain + `/api/pets/${petId}`;
  return getRequestHeaders().then((headers) => {
    return axios.put(endpoint, updateData, headers);
  });
};

export const deletePet = async (petId) => {
  const endpoint = domain + `/api/pets/${petId}`;
  return getRequestHeaders().then((headers) => {
    return axios.delete(endpoint, headers);
  });
};
