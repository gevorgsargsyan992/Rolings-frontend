"use client";
import { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IChartArea } from "../../../types";
import Typography from "@/components/Typography";

const { Text } = Typography;

const ChartBar: FC<IChartArea> = ({ className, data, title, color }) => {
  return (
    <div className={` flex flex-col items-center justify-start ${className}`}>
      {title && (
        <Text className="text-lg text-center mb-6" bold>
          {title}
        </Text>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="client count" barSize={20} fill={color || "#82ca9d"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBar;
