import { useEffect, useState } from "react";

interface ICoordinates {
  lat: number;
  lng: number;
}

const useGeolocation = () => {
  const [position, setPosition] = useState<ICoordinates | null>(null);

  const googleMapsConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    defaultZoom: 11,
  };

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
    position,
    setPosition,
    googleMapsConfig,
  };
};

export { useGeolocation };
