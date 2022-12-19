import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchWeatherData } from "services";
import { WeatherData } from "types";
import { ISummaryData, Position, Units } from "../types";
import { useGeolocation } from "./useGeolocation";

export const useWeatherData = () => {
  const { initialPosition } = useGeolocation();
  const [currentPosition, setCurrentPosition] = useState<Position>();
  const [units, setUnits] = useState<Units>("metric");

  const parseSummaryData = (data: WeatherData): ISummaryData => {
    return {
      city: data.name,
      temperature: {
        current: Math.round(data.main.temp),
        min: Math.round(data.main.temp_min),
        max: Math.round(data.main.temp_max),
        feel: Math.round(data.main.feels_like),
        humidity: Math.round(data.main.humidity),
      },
      weather: {
        description: data.weather[0]?.description,
        icon: `${process.env.REACT_APP_OPEN_WEATHER_IMAGE_STORAGE_URL}/${data.weather[0]?.icon}@2x.png`,
      },
      wind: {
        speed: data?.wind?.speed,
        temp: data?.wind?.deg,
      },
    };
  };

  useEffect(() => {
    setCurrentPosition(initialPosition);
  }, [initialPosition]);

  const weatherQuery = useQuery(
    ["weatherData", currentPosition, units],
    () =>
      fetchWeatherData({
        lat: currentPosition?.lat,
        lon: currentPosition?.lng,
        units,
      }),
    {
      enabled:
        currentPosition?.lat !== undefined &&
        currentPosition?.lng !== undefined,
      select: parseSummaryData,
    }
  );

  return {
    weatherData: weatherQuery.data,
    isLoading: weatherQuery.isFetching,
    error: weatherQuery.error as AxiosError,
    currentPosition,
    units,
    fetchWeatherData,
    handleUnitChange: (unit: Units) => setUnits(unit),
  };
};
