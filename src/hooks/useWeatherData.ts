import { useEffect, useState } from "react";
interface ICoordinates {
  lat: number;
  lng: number;
}

const useWeatherData = () => {
  const [weatherApiData, setWeatherApiData] = useState<any | null>(null);
  const [weatherForecast, setWeatherForecast] = useState<any | null>(null);
  const [nearbyCities, setNearbyCities] = useState<any[] | null>(null);

  const parseNearbyCitiesData = (data: any) => ({
    cityName: data?.name,
    coords: {
      lat: data?.coord?.lat,
      lng: data?.coord?.lon,
    },
  });

  const parseWeatherData = (data: any) => ({
    cityName: data?.name,
    weather: {
      description: data?.weather[0]?.description,
      icon: `${process.env.REACT_APP_OPEN_WEATHER_IMAGE_STORAGE_URL}/${data?.weather[0]?.icon}@2x.png`,
      temperature: `${data?.main?.temp?.toFixed()}°C`,
      minTemperature: `${data?.main?.temp_min?.toFixed()}°C`,
      maxTemperature: `${data?.main?.temp_max?.toFixed()}°C`,
    },
  });

  useEffect(() => {
    if (weatherApiData) {
      setWeatherForecast(parseWeatherData(weatherApiData?.list[0]));
      setNearbyCities(
        weatherApiData?.list
          ?.map((item: any, index: number) => {
            return index > 0 ? parseNearbyCitiesData(item) : null;
          })
          .filter((city: any) => !!city) || null
      );
    }
    return () => {};
  }, [weatherApiData]);

  const fetchWeatherData = (coords: ICoordinates) => {
    fetch(
      `${process.env.REACT_APP_OPEN_WEATHER_API_URL}/find?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&lang=pt_br&units=metric&cnt=15`
    )
      .then((response) => response.json())
      .then((data) => setWeatherApiData(data));
  };

  return {
    fetchWeatherData,
    weatherForecast,
    weatherApiData,
    nearbyCities,
  };
};

export { useWeatherData };
