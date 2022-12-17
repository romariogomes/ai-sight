import { Spinner, NearbyCities } from "components";
import {
  CityName,
  Container,
  Headline,
  WeatherDescription,
  WeatherInfoContainer,
  WeatherImage,
  WeatherTemperature,
  WeatherTemperatureVariation,
} from "./styles";

export const WeatherForecastCard = (props: any) => {
  const { cityName, weather, nearbyCities, onClickNearbyCity } = props;
  return (
    (cityName && weather && (
      <Container>
        <WeatherInfoContainer>
          <Headline>Tempo agora em</Headline>
          <CityName>{cityName}</CityName>
          <div className="primary-forecast-info">
            <WeatherImage src={weather?.icon} />
            <div>
              <WeatherTemperature>{weather?.temperature}</WeatherTemperature>
            </div>
          </div>
          <WeatherDescription>
            <h3>{weather?.description}</h3>
          </WeatherDescription>
          <WeatherTemperatureVariation>
            <h5>{`min: ${weather?.minTemperature} | max: ${weather?.maxTemperature}`}</h5>
          </WeatherTemperatureVariation>
        </WeatherInfoContainer>
        <NearbyCities {...{ nearbyCities, onClickNearbyCity }} />
      </Container>
    )) || <Spinner text="Loading forecast weather" />
  );
};
