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
