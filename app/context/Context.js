import React from "react";
import { theme } from "../config/colors";

const GlobalContext = React.createContext({
  theme,
  rooms: [],
  setRooms: () => {},
  unfilteredRooms: [],
  setUnfilteredRooms: () => {},
});

export default GlobalContext;
