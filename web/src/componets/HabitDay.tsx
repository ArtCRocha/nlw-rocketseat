import * as HoverCard from "@radix-ui/react-hover-card";
import clsx from "clsx";
import * as Checkbox from "@radix-ui/react-checkbox";
import ProgressBar from "./ProgressBar";
import { Check } from "phosphor-react";
import dayjs from "dayjs";
import { useState } from "react";
import HabitList from "./HabitList";

interface HabitDayProps {
  date: Date;
  completed?: number;
  amount?: number;
}

const HabitDay = ({ completed = 0, amount = 0, date }: HabitDayProps) => {
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMounth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");
  return (
    <HoverCard.Root>
      <HoverCard.Trigger
        className={clsx(
          "w-10 h-10 bg-zinc-900 border-2 rounded-lg cursor-pointer",
          {
            "bg-zinc-900 border-zinc-800": completedPercentage === 0,
            "bg-violet-900 border-violet-700":
              completedPercentage > 0 && completedPercentage < 20,
            "bg-violet-800 border-violet-600":
              completedPercentage >= 20 && completedPercentage < 40,
            "bg-violet-700 border-violet-500":
              completedPercentage >= 40 && completedPercentage < 60,
            "bg-violet-600 border-violet-500":
              completedPercentage >= 60 && completedPercentage < 80,
            "bg-violet-500 border-violet-400": completedPercentage >= 80,
          }
        )}
      />

      <HoverCard.Portal>
        <HoverCard.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-2xl">
            {dayAndMounth}
          </span>
          <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
            <ProgressBar progress={completedPercentage} />
          </div>
          <HoverCard.Arrow className="fill-zinc-900" height={8} width={16} />

          <HabitList date={date} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default HabitDay;
