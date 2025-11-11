import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const ProgressBar = () => {
  const percentage = 80;
  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          rotation: 0.25,
          strokeLinecap: "butt",
          textSize: "16px",
          pathTransitionDuration: 0.5,
          pathColor: `rgba(59, 177, 67, ${percentage / 100})`,
          textColor: "#f88",
          trailColor: "#d6d6d6",
          backgroundColor: "#3BB143",
        })}
      />
      
    </div>
  );
};

export default ProgressBar;
