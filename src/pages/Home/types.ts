export interface ICoordinates {
  lat: number;
  lng: number;
}

export type Position = ICoordinates | undefined;

export type Units = "metric" | "imperial";

export interface ISummaryData {
  city: string;
  temperature: {
    current: number;
    min: number;
    max: number;
    feel: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  };
  wind: {
    speed: number;
    temp: number;
  };
}

export interface IParsedForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  weather: {
    icon: string;
  };
  rain: number;
  wind: {
    speed: number;
    degree: number;
  };
}

export interface IDayForecast {
  time: string;
  temperature: number;
  rain: number;
  wind: { speed: number; direction: number };
}

export interface IWeekForecast {
  day: string;
  temperature: { min: number; max: number };
  icon?: string;
}
