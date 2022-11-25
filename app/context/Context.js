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

  userData: [],
  setUserData: () => {},

  petOwners: [],
  setPetOwners: () => {},

  doctors: [],
  setDoctors: () => {},
  unfilteredDoctors: [],
  setUnfilteredDoctors: () => {},

  timeSlots: [],
  setTimeSlots: () => {},

  whereTab: [],
  setWhereTab: () => {},
});

export default GlobalContext;
