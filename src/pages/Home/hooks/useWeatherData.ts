import { AxiosError } from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchWeatherData } from "services";
import { WeatherData } from "types";
import { ISummaryData, Position, Units } from "../types";

interface Props {
  position: Position;
}

export const useWeatherData = ({ position }: Props) => {
  const [units, setUnits] = useState<Units>("metric");

  const parseSummaryData = (data?: WeatherData): ISummaryData | undefined => {
    if (!data) return undefined;

    return {
      city: data.name,
      timezone: data.timezone,
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
        speed: data.wind.speed,
        temp: data.wind.deg,
      },
    };
  };

  const weatherQuery = useQuery(
    ["weatherData", position, units],
    () => fetchWeatherData({ lat: position?.lat, lon: position?.lng, units }),
    { enabled: position?.lat !== undefined && position?.lng !== undefined }
  );

  return {
    weatherData: parseSummaryData(weatherQuery.data),
    isLoading: weatherQuery.isFetching,
    error: weatherQuery.error as AxiosError,
    units,
    fetchWeatherData,
    handleUnitChange: (unit: Units) => setUnits(unit),
  };
};
