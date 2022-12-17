import { useEffect } from "react";
import { Layout } from "templates";
import { useGeolocation, useWeatherData } from "hooks";
import { Map, WeatherForecastCard } from "components";
import { Container, Grid, MapContainer, WeatherInfoContainer } from "./styles";

export const Home = () => {
  const { position, setPosition, googleMapsConfig } = useGeolocation();
  const { fetchWeatherData, weatherForecast, nearbyCities } = useWeatherData();

  console.log(nearbyCities);

  useEffect(() => {
    if (position) fetchWeatherData(position);
    return () => {};
  }, [position]);

  const onClickNearbyCity = (city: any) => setPosition(city?.coords);

  return (
    <Layout>
      <Container>
        <Grid>
          <WeatherInfoContainer isLoading={!weatherForecast}>
            <WeatherForecastCard
              {...{ ...weatherForecast, nearbyCities, onClickNearbyCity }}
            />
          </WeatherInfoContainer>
          <MapContainer>
            <Map
              coords={position}
              mapConfig={googleMapsConfig}
              onMarkerDrag={(map) =>
                setPosition({
                  lat: map.center.lat(),
                  lng: map.center.lng(),
                })
              }
            />
          </MapContainer>
        </Grid>
      </Container>
    </Layout>
  );
};
