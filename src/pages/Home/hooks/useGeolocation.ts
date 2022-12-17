import { useEffect, useState } from "react";
import { Position } from "../types";

export const useGeolocation = () => {
  const [position, setPosition] = useState<Position>();

  const getInitialCoordinates = async () => {
    if (typeof window != "undefined") {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setPosition({ lat: latitude, lng: longitude });
        }
      );
    }
  };

  useEffect(() => {
    getInitialCoordinates();

    return () => {};
  }, []);

  return {
    initialPosition: position,
  };
};
