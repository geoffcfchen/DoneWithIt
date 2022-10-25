import React, { useState } from "react";
import Context from "./Context";
import { theme } from "../config/colors";

export default function ContextWrapper(props) {
  const [rooms, setRooms] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState([]);
  const [unfilteredQuestions, setUnfilteredQuestions] = useState([]);
  return (
    <Context.Provider
      value={{
        theme,
        rooms,
        setRooms,
        unfilteredRooms,
        setUnfilteredRooms,
        questions,
        setQuestions,
        unfilteredQuestions,
        setUnfilteredQuestions,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
