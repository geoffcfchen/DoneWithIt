import React, { useState } from "react";
import Context from "./Context";
import { theme } from "../config/colors";

export default function ContextWrapper(props) {
  const [rooms, setRooms] = useState([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [unfilteredQuestions, setUnfilteredQuestions] = useState([]);
  const [userData, setUserData] = useState();
  const [petOwners, setPetOwners] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [unfilteredDoctors, setUnfilteredDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
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
        userData,
        setUserData,
        petOwners,
        setPetOwners,
        doctors,
        setDoctors,
        unfilteredDoctors,
        setUnfilteredDoctors,
        timeSlots,
        setTimeSlots,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
