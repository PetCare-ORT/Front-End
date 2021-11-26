import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

export const removeToken = () => {
  AsyncStorage.removeItem("token");
};

export const saveToken = (token) => {
  removeToken();
  AsyncStorage.setItem("token", JSON.stringify(token));
};

export const getStoredToken = async () => {
  return AsyncStorage.getItem("token").then((token) => {
    if (token) {
      return JSON.parse(token);
    }
  });
};

export const getUserFromToken = (token = getStoredToken()) => {
  if (!token) return null;
  const decoded = jwt_decode(token);
  return {
    _id: decoded._id,
    email: decoded.email,
    username: decoded.username,
  };
};
