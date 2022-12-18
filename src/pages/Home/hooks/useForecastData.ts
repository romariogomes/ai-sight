import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchForecastData } from "services";
import { ForecastData } from "types";
import { IDayForecast, IWeekForecast, Position, Units } from "../types";

interface Props {
  currentPosition: Position;
  units?: Units;
}

export const useForecastData = ({ currentPosition, units }: Props) => {
  const [dayForecast, setDayForecast] = useState<IDayForecast[]>([]);
  const [weekForecast, setWeekForecast] = useState<IWeekForecast[]>([]);

  const parseForecastData = (data: ForecastData) => {
    const now = dayjs();
    let date = now.format("YYYY/MM/DD");
    let temp: { min: number; max: number }[] = [];
    let forecastByHour: IDayForecast[] = [];
    let forecastByDate: {
      day: string;
      temperatures: { min: number; max: number }[];
    }[] = [];

    data.list.forEach((item) => {
      const forecastTime = dayjs.unix(item.dt);

      if (forecastTime.diff(now, "hours") <= 24) {
        forecastByHour.push({
          time: forecastTime.format("HH:mm"),
          temperature: Math.round(item.main.temp),
          rain: Math.round(item.pop * 100),
          wind: { speed: item.wind.speed, direction: item.wind.deg },
        });
      }

      if (date !== forecastTime.format("YYYY/MM/DD")) {
        forecastByDate.push({ day: date, temperatures: temp });
        date = forecastTime.format("YYYY/MM/DD");
        temp = [];
      }

      temp.push({ min: item.main.temp_min, max: item.main.temp_max });
    });

    setDayForecast(forecastByHour);
    setWeekForecast(
      forecastByDate.map((item) => ({
        day: item.day,
        temperature: item.temperatures.reduce(
          (acc, cur, _, arr) => ({
            min: acc.min + cur.min / arr.length,
            max: acc.max + cur.max / arr.length,
          }),
          { min: 0, max: 0 }
        ),
      }))
    );
  };

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
      onSuccess: (response) => parseForecastData(response),
    }
  );

  return {
    dayForecast,
    weekForecast,
    isLoading: forecastQuery.isFetching,
    error: forecastQuery.error as AxiosError,
  };
};
