import dayjs from "dayjs";
import { IWeekForecast } from "pages/Home/types";

interface IWeekForecastProps {
  data: IWeekForecast[];
}

export const WeekForecast = ({ data }: IWeekForecastProps) => {
  console.log(data);
  return (
    <div className="columns is-flex is-justify-content-center my-2">
      {data.map((item) => (
        <div
          className="column is-1 m-4 has-text-centered"
          style={{ border: "1px solid #4A4A4A", borderRadius: "5px" }}
        >
          <div className="is-size-5 has-text-weight-semibold">
            {dayjs(item.day).format("ddd")}
          </div>
          <div>
            <img src={item.icon} alt={item.day} />
          </div>
          <div className="is-flex is-justify-content-center is-size-6">
            <div className="p-1">{Math.round(item.temperature.max)}°</div>
            <div className="p-1">{Math.round(item.temperature.min)}°</div>
          </div>
        </div>
      ))}
    </div>
  );
};
