import dayjs from "dayjs";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import { generateDatesFromYearBegining } from "../utils/generate-dates-from-year-begining";
import HabitDay from "./HabitDay";

type Summary = {
  id: string;
  date: string;
  completed: number;
  amount: number;
}[];

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDays = generateDatesFromYearBegining();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDays.length;

const SummaryTable = () => {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("summary").then((res) => {
      setSummary(res.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => {
          return (
            <div
              key={index}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDays.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          });

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              completed={dayInSummary?.completed}
              amount={dayInSummary?.amount}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return (
              <div
                key={index}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-not-allowed opacity-40"
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default SummaryTable;
