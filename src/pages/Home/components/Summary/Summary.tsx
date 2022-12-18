import dayjs from "dayjs";
import { Card, LineChart } from "components";
import { ISummaryData, Units } from "pages/Home/types";

interface ISummaryProps {
  data?: ISummaryData;
  units?: Units;
  handleUnitChange: (unit: Units) => void;
}

export const Summary = ({ data, units, handleUnitChange }: ISummaryProps) => {
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
      <div className="columns">
        <div className="column is-12" style={{ height: 300 }}>
          <LineChart
            data={{
              x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              y: [120, 132, 101, 134, 90, 230, 210],
            }}
            color={"#0F0"}
          />
        </div>
      </div>
    </Card>
  );
};
