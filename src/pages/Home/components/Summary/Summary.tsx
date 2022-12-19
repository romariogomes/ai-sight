import dayjs from "dayjs";
import { Card, Spinner } from "components";
import { ISummaryData, Position, Units } from "pages/Home/types";
import { ForecastSection } from "./components";

interface ISummaryProps {
  data?: ISummaryData;
  currentPosition?: Position;
  units?: Units;
  isLoading: boolean;
  handleUnitChange: (unit: Units) => void;
}

export const Summary = ({
  data,
  isLoading,
  currentPosition,
  units,
  handleUnitChange,
}: ISummaryProps) => {
  if (isLoading)
    return (
      <Card>
        <div
          className="is-flex is-justify-content-center is-align-items-center"
          style={{ height: 150 }}
        >
          <Spinner />
        </div>
      </Card>
    );

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
                style={{ width: 100, height: 100 }}
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
                <div className="is-size-7">{`Humidity: ${data.temperature.humidity}%`}</div>
                <div className="is-size-7">{`Wind: ${data.wind.speed} m/s`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-6 is-flex is-justify-content-end is-align-items-center">
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
