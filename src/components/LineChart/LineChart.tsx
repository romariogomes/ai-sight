import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

export interface ILineChartProps {
  color: string;
  data: {
    x: string[];
    y: number[];
  };
}

export const LineChart = ({ data, color }: ILineChartProps) => {
  const graphOptions = {
    tooltip: { show: false },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [{ type: "category", boundaryGap: false, data: data.x }],
    yAxis: [
      {
        type: "value",
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: "Email",
        type: "line",
        symbolSize: 0,
        label: { show: true },
        lineStyle: { color },
        areaStyle: { color: `${color}3` },
        itemStyle: { color },
        data: data.y,
      },
    ],
  };
  return (
    <ReactECharts
      echarts={echarts}
      option={graphOptions}
      style={{ height: "100%", width: "100%" }}
    />
  );
};
