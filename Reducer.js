import { saveToken, removeToken } from "./utils/tokenStorage";

export const Datos = {
  token: "",
  loggedIn: false,
  pets: [],
  diaryEntries: [],
  calendarEntries: [],
  reminders: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_AND_STORE":
      saveToken(action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        loggedIn: true,
      };
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        loggedIn: true,
      };
    case "LOGOUT":
      removeToken();
      return {
        ...state,
        token: "",
        loggedIn: false,
      };
    case "STORE_PETS":
      return {
        ...state,
        pets: action.payload.pets,
      };
  }
};
