import { Layout } from "pages";
import { CitiesList, Summary } from "./components";
import { useGeolocation, useWeatherData } from "./hooks";

export const Home = () => {
  const { position, handlePositionChange } = useGeolocation();
  const { weatherData, units, isLoading, handleUnitChange } = useWeatherData({
    position,
  });

  return (
    <Layout>
      <div className="columns">
        <div className="column is-8">
          <Summary
            data={weatherData}
            isLoading={isLoading}
            currentPosition={position}
            units={units}
            handleUnitChange={handleUnitChange}
          />
        </div>
        <div className="column is-4">
          <CitiesList handleCityClick={handlePositionChange} />
        </div>
      </div>
    </Layout>
  );
};
