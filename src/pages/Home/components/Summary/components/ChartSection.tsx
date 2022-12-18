import { Tabs, Tab } from "@mui/material";
import { LineChart } from "components";
import { useEffect, useState } from "react";

interface Data {
  name: string;
  color: string;
  data: { x: string[]; y: number[] };
}

interface IChartSectionProps {
  data: Data;
}

export const ChartSection = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Temperature");
  const [data, setData] = useState<Data>();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const selector: Data[] = [
    {
      name: "Temperature",
      color: "#FF0",
      data: {
        x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        y: [120, 132, 101, 134, 90, 230, 210],
      },
    },
    {
      name: "Rain",
      color: "#00F",
      data: {
        x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        y: [12, 12, 10, 13, 9, 2, 1],
      },
    },
  ];

  useEffect(() => {
    setData(selector.find((i) => i.name === selectedTab));
  }, [selectedTab]);

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
                  selector.find((i) => i.name === selectedTab)?.color ||
                  undefined,
              },
            }}
          >
            {selector.map((item) => (
              <Tab
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
        {data && <LineChart data={data.data} color={data.color} />}
      </div>
    </div>
  );
};
