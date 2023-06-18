import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { request } from "../../../utils/request";
import { calendar } from "../../../utils/function/calendar";

const NutritionStat = () => {
  const [show, setShow] = useState("day");
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0))); // 선택된 날짜
  const [startDate, setStartDate] = useState(date);
  const [chartData, setChartData] = useState("");

  const calendarHandler = (event, show) => {
    const result = calendar(event, show);
    setDate(result[1]);
    adjustData(result[0], result[1]);
  };

  const adjustData = async (show, date) => {
    let resultPromise = new Promise((resolve, reject) => {
      request()
        .post("profile/nutrition", { period: show, date })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

    let result, item, data;
    let input = [];
    let newData = [];
    try {
      result = await resultPromise;
    } catch (err) {
      return;
    }

    switch (show) {
      case "week":
        input = new Array(7);
        break;
      case "day":
        input = new Array(4);
        break;
      case "year":
        input = new Array(12);
        break;
      case "month":
        input = new Array(31);
        break;
      default:
        return;
    }

    for (let i = 0; i < input.length; i++) {
      data = result[i].time;
      if (result) {
        const cho = result[i].cho * 4;
        const protein = result[i].protein * 4;
        const fat = result[i].fat * 9;
        item = {
          name: data,
          cho: cho,
          protein: protein,
          fat: fat,
          etc: result[i].calorie - (cho + protein + fat),
          createdAt: result[i].createdAt,
        };
      } else
        item = {
          name: data,
          cho: 0,
          protein: 0,
          fat: 0,
          etc: 0,
          createdAt: "기록 없음",
        };
      newData.push(item);
    }
    setChartData(newData);
  };

  return (
    <div className='flex flex-col w-full h-full p-5 overflow-auto text-black bg-gray-400 dark:bg-gray-700'>
      <div className='flex flex-col w-[35vh]'>
        <div className='flex flex-row'>
          <button
            className={`flex w-1/4 h-full bg-gray-200 rounded-tl-lg rounded-tr-lg p-5 flex-col hover:bg-hover hover:transition
      ${show === "year" ? "bg-blue-500" : ""}`}
            onClick={(e) => setShow("year")}
          >
            연간
          </button>
          <button
            className={`flex w-1/4 h-full bg-gray-200 rounded-tl-lg rounded-tr-lg p-5 flex-col hover:bg-hover hover:transition
      ${show === "month" ? "bg-blue-500" : ""}`}
            onClick={(e) => setShow("month")}
          >
            월간
          </button>
          <button
            className={`flex w-1/4 h-full bg-gray-200 rounded-tl-lg rounded-tr-lg p-5 flex-col hover:bg-hover hover:transition
      ${show === "week" ? "bg-blue-500" : ""}`}
            onClick={(e) => setShow("week")}
          >
            주간
          </button>
          <button
            className={`flex w-1/4 h-full bg-gray-200 rounded-tl-lg rounded-tr-lg p-5 flex-col hover:bg-hover hover:transition
      ${show === "day" ? "bg-blue-500" : ""}`}
            onClick={(e) => setShow("day")}
          >
            일간
          </button>
        </div>
        {show === "year" && (
          <Calendar
            value={date}
            onChange={(e) => {
              calendarHandler(e, show, date);
            }}
            maxDetail='decade'
            onViewChange={({ activeStartDate }) => setStartDate(activeStartDate.getFullYear())}
          />
        )}
        {show === "month" && (
          <Calendar
            value={date}
            onChange={(e) => {
              calendarHandler(e, show, date);
            }}
            minDetail='decade'
            maxDetail='year'
            onViewChange={({ activeStartDate }) => setStartDate(activeStartDate.getFullYear())}
          />
        )}
        {(show === "day" || show === "week") && (
          <Calendar
            value={date}
            onChange={(e) => {
              calendarHandler(e, show, date);
            }}
            onViewChange={({ activeStartDate }) => setStartDate(activeStartDate.getFullYear())}
          />
        )}
      </div>

      <div className='items-center mt-5'>
        <ResponsiveContainer width={show === "month" ? "225%" : "100%"} height={500}>
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

        <label className='flex w-full mt-1 text-sm text-center text-gray-500'>cho: 탄수화물 protein: 단백질 fat: 지방</label>
        <label className='flex w-full mt-1 text-sm text-center text-gray-500'>탄수화물(g) * 4 + 단백질(g) * 4 + 지방(g) * 9 값입니다.</label>
      </div>
    </div>
  );
};

export default NutritionStat;
