import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { request } from "../../../utils/request";
import { calendar } from "../../../utils/function/calendar";

const ExerciseStat = () => {
  const [show, setShow] = useState("day");
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0))); // 선택된 날짜
  const [startDate, setStartDate] = useState(date);
  const [chartData, setChartData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("운동 선택");
  const options = ["squat", "pushup", "situp"];

  const setIsOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  const setSelectedItemHandler = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const calendarHandler = (event, show, selectedItem) => {
    const result = calendar(event, show);
    setDate(result[1]);
    adjustData(result[0], result[1], selectedItem);
  };

  const adjustData = async (show, date) => {
    let resultPromise = new Promise((resolve, reject) => {
      request()
        .post("profile/Exercise", { period: show, date, condition: selectedItem })
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
        item = {
          name: data,
          type: result[i].type,
          count: result[i].count,
          score: result[i].score,
          timer: result[i].timer,
          createdAt: result[i].createdAt,
        };
      } else
        item = {
          name: data,
          type: 0,
          count: 0,
          score: 0,
          timer: 0,
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
        <div className='relative z-50'>
          <div className={`flex items-center justify-between px-4 py-2 border border-gray-300 bg-white cursor-pointer`} onClick={setIsOpenHandler}>
            {selectedItem ? selectedItem : "운동 선택"}
            <svg xmlns='http://www.w3.org/2000/svg' className={`h-5 w-5 ${isOpen ? "transform rotate-180" : ""}`} viewBox='0 0 20 20' fill='currentColor'>
              <path fillRule='evenodd' d='M10 14l6-6H4l6 6z' />
            </svg>
          </div>
          {isOpen && (
            <div className='absolute w-full border border-gray-300 top-full'>
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 cursor-pointer ${selectedItem === option ? "bg-blue-500 text-white" : "bg-white"}`}
                  onMouseEnter={() => setSelectedItem(option)}
                  onMouseLeave={() => setSelectedItem("")}
                  onClick={() => setSelectedItemHandler(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

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

        <label className='flex w-full mt-1 text-sm text-center text-gray-500'>cho: 탄수화물 protein: 단백질 fat: 지방</label>
        <label className='flex w-full mt-1 text-sm text-center text-gray-500'>탄수화물(g) * 4 + 단백질(g) * 4 + 지방(g) * 9 값입니다.</label>
      </div>
    </div>
  );
};

export default ExerciseStat;
