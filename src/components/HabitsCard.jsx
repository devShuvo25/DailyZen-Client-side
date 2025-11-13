import React from "react";
import { Link } from "react-router";

const HabitsCard = ({ habit }) => {
  const { _id, title, category, image,  created_at} =
    habit;
    console.log(habit)
  return (
    <div className=" p-3 flex flex-col justify-between shadow-sm">
      <div class="relative w-full h-[300px] ">
        <img src={image} class="w-full h-full object-cover" />

        <div class="absolute inset-0 bg-black opacity-50"></div>

        <div class="absolute inset-1 flex flex-col items-center gap-5 justify-center text-white">
          <h1 class="text-xl text-white font-bold ms-10 text-left ">{title}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <h4 className="text-xl font-bold mt-2">{title || ""}</h4>
        <div className="flex items-center justify-between">
          <span>{category}</span>
          <div className="badge badge-outline badge-error">{created_at.split(",")[0]}</div>
        </div>
        <Link to={"/habit-details"} state={_id} className="btn my-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HabitsCard;
