import { saveToken, removeToken, getUserFromToken } from "./utils/tokenStorage";

export const Datos = {
  token: "",
  loggedIn: false,
  userData: {},
  pets: [],
  diaryEntries: [],
  calendarEntries: {},
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
        userData: getUserFromToken(action.payload.token),
      };
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        loggedIn: true,
        userData: getUserFromToken(action.payload.token),
      };
    case "UPDATE_USER":
      return {
        ...state,
        userData: {
          ...state.userData,
          username: action.payload.username,
          photoUrl: action.payload.photoUrl,
        },
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
    case "STORE_CALENDAR_ENTRIES":
      return {
        ...state,
        calendarEntries: action.payload.calendarEntries,
      };
  }
};
