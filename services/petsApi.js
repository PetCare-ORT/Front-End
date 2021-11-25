import axios from "axios";
import { getRequestHeaders } from "./helpers/requestHeaders";
import Constants from "../lib/Constants";

const petUrl = Constants.HOST + Constants.PET_ENDPOINT

export const getUserPets = async () => {
  return getRequestHeaders().then((headers) => {
    return axios.get(petUrl, headers);
  });
};

export const addPet = async (pet) => {
  return getRequestHeaders().then((headers) => {
    return axios.post(petUrl, pet, headers);
  });
};

export const editPet = async (petId, updateData) => {
  const editPetEndpoint = petUrl +`/${petId}`;
  return getRequestHeaders().then((headers) => {
    return axios.put(editPetEndpoint, updateData, headers);
  });
};

export const deletePet = async (petId) => {
  const deletePetEndpoint = petUrl +`/${petId}`;
  return getRequestHeaders().then((headers) => {
    return axios.delete(deletePetEndpoint, headers);
  });
};
