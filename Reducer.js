import AsyncStorage from "@react-native-async-storage/async-storage";

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
      storeToken(action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        loggedIn: true,
      };
    case "LOGOUT":
      storeToken(null);
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

const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem("token", JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};
