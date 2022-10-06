import { useState, useEffect } from "react";
import * as Location from "expo-location";
import logger from "../utility/logger";

export default useLocation = () => {
  const [location, setLocation] = useState();
  const getlocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      logger.log(error);
    }
  };

  useEffect(() => {
    getlocation();
  }, []);

  return location;
};
