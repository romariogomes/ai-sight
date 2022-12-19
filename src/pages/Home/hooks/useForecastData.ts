import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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
    let min: number | undefined;
    let max: number | undefined;
    let forecastByHour: IDayForecast[] = [];
    let forecastByDate: IWeekForecast[] = [];

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

      if (
        date !== forecastTime.format("YYYY/MM/DD") &&
        min !== undefined &&
        max !== undefined
      ) {
        forecastByDate.push({
          day: date,
          temperature: { min, max },
          icon: `${process.env.REACT_APP_OPEN_WEATHER_IMAGE_STORAGE_URL}/${item.weather[0]?.icon}.png`,
        });
        date = forecastTime.format("YYYY/MM/DD");
        [min, max] = [undefined, undefined];
      }

      if (min === undefined || (min && item.main.temp_min < min))
        min = item.main.temp_min;
      if (max === undefined || (max && item.main.temp_max > max))
        max = item.main.temp_max;
    });

    setDayForecast(forecastByHour);
    setWeekForecast(forecastByDate);
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
    }
  );

  useEffect(() => {
    forecastQuery.data && parseForecastData(forecastQuery.data);
  }, [forecastQuery.data]);

  return {
    dayForecast,
    weekForecast,
    isLoading: forecastQuery.isFetching,
    error: forecastQuery.error as AxiosError,
  };
};
