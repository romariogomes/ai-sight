import dayjs from "dayjs";
import { Card } from "components";
import { ISummaryData, Position, Units } from "pages/Home/types";
import { ForecastSection } from "./components";

interface ISummaryProps {
  data?: ISummaryData;
  currentPosition?: Position;
  units?: Units;
  handleUnitChange: (unit: Units) => void;
}

export const Summary = ({
  data,
  currentPosition,
  units,
  handleUnitChange,
}: ISummaryProps) => {
  if (!data) return null;

  return (
    <Card>
      <div className="columns">
        <div className="column is-6">
          <div className="is-flex is-align-items-center">
            <div className="is-flex is-align-items-center mr-2">
              <img
                src={data.weather.icon}
                alt={`${data.weather.description} icon`}
              />
              <div className="is-size-1 has-text-weight-semibold">
                {data.temperature.current}
              </div>
            </div>
            <div className="is-flex is-align-items-start">
              <div>
                <span
                  className={`is-clickable ${
                    units === "metric"
                      ? "has-text-weight-bold"
                      : "has-text-weight-normal"
                  }`}
                  onClick={() => handleUnitChange("metric")}
                >
                  °C
                </span>{" "}
                |{" "}
                <span
                  className={`is-clickable ${
                    units === "imperial"
                      ? "has-text-weight-bold"
                      : "has-text-weight-normal"
                  }`}
                  onClick={() => handleUnitChange("imperial")}
                >
                  °F
                </span>
              </div>
              <div className="mx-2">
                <div className="is-size-7">{`Rain: ${data.wind.speed}%`}</div>
                <div className="is-size-7">{`Humidity: ${data.temperature.humidity}%`}</div>
                <div className="is-size-7">{`Wind: ${data.wind.speed} m/s`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-6">
          <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-end">
            <div className="is-size-5 has-text-weight-semibold">
              {data.city}
            </div>
            <div className="is-size-6">{dayjs().format("dddd, HH:mm")}</div>
            <div className="is-size-6">{data.weather.description}</div>
          </div>
        </div>
      </div>
      <ForecastSection currentPosition={currentPosition} units={units} />
    </Card>
  );
};
