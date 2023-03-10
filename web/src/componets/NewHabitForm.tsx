import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import api from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const NewHabitForm = () => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title === null) {
      return;
    }

    await api
      .post("/habits", {
        title,
        weekDays,
      })
      .then(() => {
        setModal(true);
        setTitle("");
        setWeekDays([]);
        setTimeout(() => {
          setModal(false);
        }, 2600);
      });
  }

  // Verifica se o dia da semana já existe

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddOne);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col mt-6 ">
      {modal && (
        <div className="w-full bg-green-500 rounded-lg p-3">
          <p className="text-white leading-tight">Hábito criado com sucesso</p>
        </div>
      )}
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="" className="font-semibold leading-tight">
        Qual a recorrência?
      </label>
      <div className="flex flex-col mt-3">
        {availableWeekDays.map((availableWeekDay, index) => {
          return (
            <Checkbox.Root
              key={index}
              className="flex p-1 items-center gap-3 group"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">
                {availableWeekDay}
              </span>
            </Checkbox.Root>
          );
        })}
      </div>
      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
};

export default NewHabitForm;
