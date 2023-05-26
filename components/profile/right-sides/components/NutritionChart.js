import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const NutritionChart = ({ show = "", chartData = [] }) => {

    return (
      <div className="flex flex-col w-[50%]">
      <label className='flex w-full text-gray-500 text-sm mt-1 text-center'>식사 기록</label>
        <ResponsiveContainer width = "100%" height={500}>
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
                return `${data.name} (${formattedDate})`;
              }
              return label;
            }}
            formatter={(value, name, props) => {
              if (name === "cho") return `${value.toFixed(2)}kcal (탄수화물g*4)`;
              if (name === "protein") return `${value.toFixed(2)}kcal (단백질g*4)`;
              if (name === "fat") return `${value.toFixed(2)}kcal (지방g*9)`;
              if (name === "etc") return `${value.toFixed(2)}kcal (기타)`;
            }}
          />
          <Legend />
          <Bar dataKey='cho' stackId='a' fill='#8884d8' />
          <Bar dataKey='protein' stackId='a' fill='#82ca9d' />
          <Bar dataKey='fat' stackId='a' fill='#ff7300' />
          <Bar dataKey='etc' stackId='a' fill='#808080' />
          <Bar
            dataKey='total'
            stackId='a'
            fill='transparent'
            stroke='#000000'
            strokeWidth={2}
            label={{
              position: "insideTopRight",
              formatter: (value, _, __) => (value !== 0 ? `${value}kcal` : null),
              fill: "#000000",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
      <label className='flex w-full text-gray-500 text-sm mt-1 text-center'>cho: 탄수화물 protein: 단백질 fat: 지방</label>
      <label className='flex w-full text-gray-500 text-sm mt-1 text-center'>총 값은 칼로리로, 탄수화물(g) * 4 + 단백질(g) * 4 + 지방(g) * 9 값입니다.</label>
      </div>
    )}
    
export default NutritionChart;
