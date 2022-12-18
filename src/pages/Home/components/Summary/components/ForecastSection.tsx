import { Tabs, Tab } from "@mui/material";
import { LineChart } from "components";
import { useForecastData } from "pages/Home/hooks";
import { Position, Units } from "pages/Home/types";
import { useEffect, useMemo, useState } from "react";

interface Data {
  name: string;
  color: string;
  data: { x: string[]; y: number[] };
}

interface IForecastSectionProps {
  currentPosition: Position;
  units?: Units;
}

export const ForecastSection = ({
  currentPosition,
  units,
}: IForecastSectionProps) => {
  const { dayForecast, forecastData } = useForecastData({
    currentPosition,
    units,
  });
  const [selectedTab, setSelectedTab] = useState<string>("Temperature");
  const [chartData, setChartData] = useState<Data>();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const kpis: Data[] = useMemo(
    () => [
      {
        name: "Temperature",
        color: "#FF0",
        data: {
          x: dayForecast.map((i) => i.time),
          y: dayForecast.map((i) => i.temperature),
        },
      },
      {
        name: "Rain",
        color: "#00F",
        data: {
          x: dayForecast.map((i) => i.time),
          y: dayForecast.map((i) => i.rain),
        },
      },
    ],
    [dayForecast]
  );

  useEffect(() => {
    setChartData(kpis.find((i) => i.name === selectedTab));
  }, [selectedTab, kpis]);

  return (
    <div className="columns my-2">
      <div className="column is-12" style={{ height: 300 }}>
        <div>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            TabIndicatorProps={{
              sx: {
                background:
                  kpis.find((i) => i.name === selectedTab)?.color || undefined,
              },
            }}
          >
            {kpis.map((item) => (
              <Tab
                key={item.name}
                label={item.name}
                value={item.name}
                sx={{
                  textTransform: "none",
                  color: "#4A4A4A",
                  "&.Mui-selected": { color: "#4A4A4A", fontWeight: 600 },
                }}
              />
            ))}
          </Tabs>
        </div>
        {chartData && (
          <LineChart data={chartData.data} color={chartData.color} />
        )}
      </div>
    </div>
  );
};
