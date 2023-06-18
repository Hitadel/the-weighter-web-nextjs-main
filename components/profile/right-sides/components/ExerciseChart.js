import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const ExerciseChart = ({ show = "", chartData = [] }) => {

    return (
      <div className="flex flex-col w-[50%]">
      <label className='flex w-full text-gray-500 text-sm mt-1 text-center'>운동 기록</label>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip
              labelFormatter={(label) => {
                const data = chartData.find((item) => item.name === label);
                if (data) {
                  const date = new Date(data.createdAt);
                  let formattedDate;
                  if (show === "day") formattedDate = date.toLocaleString([], { dateStyle: "short", timeStyle: "short" });
                  else formattedDate = date.toLocaleString([], { dateStyle: "short" });
                  return `${data.name} ${data.type} (${formattedDate})`;
                }
                return label;
              }}
              formatter={(value, name, props) => {
                if (name === "count") return `${value} 회`;
              }}
            />
            <Legend />
            <Bar
              dataKey='count'
              stackId='a'
              fill='#8884d8'
              strokeWidth={2}
              label={{
                position: "insideTopRight",
                formatter: (value, _, __) => (value !== 0 ? `${value}회` : null),
                fill: "#000000",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
        </div>
    )}
    
export default ExerciseChart;
