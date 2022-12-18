import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchForecastData } from "services";
import { ForecastData, ForecastItem, WeatherData } from "types";
import {
  IDayForecast,
  IParsedForecast,
  ISummaryData,
  Position,
  Units,
} from "../types";

interface Props {
  currentPosition: Position;
  units?: Units;
}

export const useForecastData = ({ currentPosition, units }: Props) => {
  console.log(currentPosition);
  const [forecast, setForecast] = useState<any | null>(null);
  const [dayForecast, setDayForecast] = useState<IDayForecast[]>([]);

  // const parseForecastData = (data: ForecastItem): IParsedForecast => {
  //   return {
  //     date: dayjs.unix(data.dt).format("ddd"),
  //     temperature: {
  //       min: Math.round(data.main.temp_min),
  //       max: Math.round(data.main.temp_max),
  //     },
  //     rain: data.rain["3h"],
  //     weather: {
  //       icon: `${process.env.REACT_APP_OPEN_WEATHER_IMAGE_STORAGE_URL}/${data.weather[0]?.icon}@1x.png`,
  //     },
  //     wind: {
  //       speed: data.wind.speed,
  //       degree: data.wind.deg,
  //     },
  //   };
  // };

  const parseForcastData = (data: ForecastData) => {
    const now = dayjs();
    let dayForecast: IDayForecast[] = [];

    data.list.forEach((item) => {
      const forecastTime = dayjs.unix(item.dt);

      if (forecastTime.diff(now, "hours") <= 24) {
        dayForecast.push({
          time: forecastTime.format("HH:mm"),
          temperature: Math.round(item.main.temp),
          rain: Math.round(item.pop * 100),
          wind: {
            speed: item.wind.speed,
            direction: item.wind.deg,
          },
        });
      }
    });

    setDayForecast(dayForecast);
  };

  // const getTodayForecast = (data: ForecastItem): IDayForecast => {
  //   return [{ type: "Temperature", time: dayjs(data.dt) }];
  // };

  const forecastQuery = useQuery(
    ["forecastData", currentPosition, units],
    () =>
      fetchForecastData({
        lat: currentPosition?.lat,
        lon: currentPosition?.lng,
        units,
      }),
    {
      enabled:
        currentPosition?.lat !== undefined &&
        currentPosition?.lng !== undefined,
      // select: (response) => response.list.map(parseForecastData),
      onSuccess: (response) => parseForcastData(response),
    }
  );

  return {
    dayForecast,
    forecastData: forecastQuery.data,
  };
};
