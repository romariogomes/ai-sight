import { Layout } from "pages";
import { Summary } from "./components";
import { useWeatherData } from "./hooks";

export const Home = () => {
  const { summaryData, currentPosition, units, handleUnitChange } =
    useWeatherData();

  return (
    <Layout>
      <div className="columns">
        <div className="column is-8">
          <Summary
            data={summaryData}
            currentPosition={currentPosition}
            units={units}
            handleUnitChange={handleUnitChange}
          />
        </div>
        <div className="column is-4">nearby cities</div>
      </div>
    </Layout>
  );
};
