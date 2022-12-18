import { Layout } from "pages";
import { Summary } from "./components";
import { useWeatherData } from "./hooks";

export const Home = () => {
  const { summaryData, units, handleUnitChange } = useWeatherData();

  return (
    <Layout>
      <div className="columns">
        <div className="column is-8">
          <Summary
            data={summaryData}
            handleUnitChange={handleUnitChange}
            units={units}
          />
        </div>
        <div className="column is-4">nearby cities</div>
      </div>
    </Layout>
  );
};
