import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchWeatherData } from "services";
import { WeatherData } from "types";
import { ISummaryData, Position } from "../types";
import { useGeolocation } from "./useGeolocation";

const useWeatherData = () => {
  const { initialPosition } = useGeolocation();
  const [currentPosition, setCurrentPosition] = useState<Position>();
  const [forecast, setForecast] = useState<any | null>(null);
  const [nearbyCities, setNearbyCities] = useState<any[] | null>(null);

  const parseNearbyCitiesData = (data: any) => ({
    cityName: data?.name,
    coords: {
      lat: data?.coord?.lat,
      lng: data?.coord?.lon,
    },
  });

  const parseSummaryData = (data: WeatherData): ISummaryData => {
    return {
      city: data?.name,
      temperature: {
        current: data?.main?.temp,
        min: data?.main?.temp_min,
        max: data?.main?.temp_max,
        feel: data?.main?.feels_like,
      },
      weather: {
        description: data?.weather[0]?.description,
        icon: `${process.env.REACT_APP_OPEN_WEATHER_IMAGE_STORAGE_URL}/${data?.weather[0]?.icon}@2x.png`,
      },
      wind: {
        speed: data?.wind?.speed,
        temp: data?.wind?.deg,
      },
    };
  };

  const handleNearbyCityClick = (city: any) => setCurrentPosition(city?.coords);

  useEffect(() => {
    setCurrentPosition(initialPosition);
  }, [initialPosition]);

  const weatherData = useQuery(
    ["weatherData", currentPosition],
    () =>
      fetchWeatherData({
        lat: currentPosition?.lat,
        lon: currentPosition?.lng,
      }),
    {
      enabled:
        currentPosition?.lat !== undefined &&
        currentPosition?.lng !== undefined,
      select: parseSummaryData,
    }
  );

  return {
    forecast,
    summaryData: weatherData.data,
    nearbyCities,
    fetchWeatherData,
    handleNearbyCityClick,
  };
};

export { useWeatherData };
