import React from "react";
import { theme } from "../config/colors";

const GlobalContext = React.createContext({
  theme,
  rooms: [],
  setRooms: () => {},
  unfilteredRooms: [],
  setUnfilteredRooms: () => {},
  questions: [],
  setQuestions: () => {},
  unfilteredQuestions: [],
  setUnfilteredQuestions: () => {},
});

export default GlobalContext;
