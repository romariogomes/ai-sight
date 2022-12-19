import axios from "axios";
import { ForecastData, WeatherData } from "types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_OPEN_WEATHER_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  params: { appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY },
});

interface IWeatherDataParams {
  lat?: number;
  lon?: number;
  units?: string;
}

export const fetchWeatherData = async ({
  lat,
  lon,
  units = "metric",
}: IWeatherDataParams): Promise<WeatherData> => {
  const { data } = await axiosInstance.get<WeatherData>("weather", {
    params: { lat, lon, units },
  });

  return data;
};

export const fetchForecastData = async ({
  lat,
  lon,
  units = "metric",
}: IWeatherDataParams): Promise<ForecastData> => {
  const { data } = await axiosInstance.get<ForecastData>("forecast", {
    params: { lat, lon, units },
  });

  return data;
};
