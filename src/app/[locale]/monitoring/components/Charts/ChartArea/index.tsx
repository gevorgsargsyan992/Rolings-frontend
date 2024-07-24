"use client";
import { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IChartArea } from "../../../types";
import Typography from "@/components/Typography";

const { Text } = Typography;

const ChartArea: FC<IChartArea> = ({ className, data, title, tick = true }) => (
  <div
    className={`flex flex-col items-center justify-start ${className} p-4 sm:p-6 lg:p-8`}
  >
    {title && (
      <Text className="text-lg text-center mb-4 sm:mb-6 lg:mb-8" bold>
        {title}
      </Text>
    )}
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="client count"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default ChartArea;

