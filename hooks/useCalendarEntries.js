import React from "react";

import GlobalContext from "../context";
import { getUserCalendarEntries } from "../services/calendarApi.js";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

export default function useCalendarEntries() {
  const { state, dispatch } = React.useContext(GlobalContext);

  const getCalendarEntries = async () => {
    try {
      const calendarEntries = await getUserCalendarEntries();
      const calendarData = calendarEntries.data;

      const formattedEntries = { ...state.calendarEntries };

      calendarData.forEach((element) => {
        const time = new Date(element.date).getTime();
        const strTime = timeToString(time);

        const calendarEntry = formattedEntries[strTime];

        if (!calendarEntry) {
          formattedEntries[strTime] = [];
          formattedEntries[strTime].push({
            _id: element._id,
            name: element.name,
            description: element.description,
            date: element.date,
            height: 200,
          });
        }
      });

      dispatch({
        type: "STORE_CALENDAR_ENTRIES",
        payload: { calendarEntries: formattedEntries },
      });

      return formattedEntries;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return {
    getCalendarEntries,
    entries: state.calendarEntries,
  };
}
