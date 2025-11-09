import React from "react";
import { LuClockAlert } from "react-icons/lu";

const BadHabitsCard = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-[400px] border-[1px] border-gray-400 rounded-2xl p-5 gap-2 absolute top-0">
        <div>
          <LuClockAlert size={30} className="color-primary" />
        </div>
        <h2 className="text-2xl font-semibold">Procrastination</h2>
        <p>
          Delaying important tasks leads to stress and missed opportunities. Why
          it’s harmful: It reduces productivity and creates anxiety over
          unfinished work.
        </p>
      </div>
    </div>
  );
};

export default BadHabitsCard;
