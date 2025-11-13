import React, { useEffect, useEffectEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import ProgressBar from "../components/ProgressBar";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const Details = () => {
  const { user } = useAuth();
  const location = useLocation();
  console.log(location);
  const { instance } = useAxiosSecure();
  const [currentHabit, setCurrentHabit] = useState(null);
  const [progressDayCount,setProgressDayCount] = useState();
  // calculate data for ......... progress bar
  const getLast30DaysCompletion = (completedDates) => {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // filter dates that are within the last 30 days
  const completedLast30Days = completedDates.filter(dateStr => {
    const date = new Date(dateStr);
    return date >= thirtyDaysAgo && date <= today;
  });

  return completedLast30Days.length;
};
useEffect(() => {
  if(currentHabit && currentHabit.completion_history){
    const count = getLast30DaysCompletion(currentHabit.completion_history)
    setProgressDayCount(count)
  }
},[currentHabit])
  useEffect(() => {
    instance
      .get(`/current-product/${location.state}`)
      .then((result) => {
        const currentHabit = result.data;
        setCurrentHabit(currentHabit);
      })
      .catch((errr) => {
        console.log(errr);
      });
  }, [instance, user, location]);
  console.log(currentHabit);
  //
  const handleComplete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Complete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          instance
            .patch(`/habits-complete/${id}`)
            .then((result) => {
              console.log(result)
              if (result) {
                setCurrentHabit((prev) => ({
                  ...prev, current_streak : result?.data?.streak,
                   completion_history: result.data.completion_history ,
                }))
                swalWithBootstrapButtons.fire({
                  title: "Congratulations",
                  text: "Your habit's task completed.",
                  icon: "success",
                });
              }
            })
            .catch((err) => {
                if(err.response.data){
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Already completed today",
                footer: '<a href="#">Please try in Tommorrow</a>'
});
                }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const parcentage = (progressDayCount / 30) * 100;

  
  return (
      <div>
        <div>
          <div className="flex flex-col lg:flex-row lg:h-[400px] h-[700px] gap-10 lg:p-8 ">
            <div className="flex justify-center lg:w-[35%]">
              <img
                className="w-full ] rounded-2xl"
                src={currentHabit?.image}
                alt=""
              />
            </div>
            <div className="flex w-full flex-col gap-2 px-5 lg:px-0">
              <div className="w-full">
                <h1 className="text-3xl font-semibold mb-[5px]">
                  {currentHabit?.title || "Title not added"}
                </h1>
                <p className="text-sm opacity-70">{currentHabit?.category}</p>
                <hr
                  className="my-2 text-gray-300 px-5
                    "
                />
              </div>
                <div className="lg:hidden flex items-center justify-center my-5 h-[180px]">
                                <div className="h-[130px] w-[130px] ">
                    
                    <CircularProgressbar
                      value={parcentage}
                      text={parcentage}
                      styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: "butt",
                        textSize: "16px",
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(59, 177, 67, ${{parcentage}/ 100})`,
                        textColor: "#f88",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3BB143",
                        })}/>
                  <h3 className="text-xl my-3">Your Progress</h3>
                  </div>
                </div>
              <div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 ">
                  <div className="h-[100px] w-[100px] text-center hidden lg:block">
                    <div className="h-[100px] w-[100px] ">
                    
                    <CircularProgressbar
                      value={parcentage}
                      text={parcentage.toFixed(2)}
                      styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: "butt",
                        textSize: "16px",
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(59, 177, 67, ${{parcentage}/ 100})`,
                        textColor: "#f88",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3BB143",
                        })}/>
                  </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-[12px] opacity-70 ">
                      Daily Streak Count
                    </p>
                    <div className="badge badge-warning mt-1 px-9">
                      {currentHabit?.current_streak}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[12px] opacity-70">Created at</p>
                    <h1 className="text-md ">
                      {currentHabit?.created_at.split(",")[0]}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[12px] opacity-70">User Name</p>
                    <h1 className="text-md ">{currentHabit?.user_name}</h1>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[12px] opacity-70">user Email</p>
                    <h1 className="text-md ">{currentHabit?.user_email}</h1>
                  </div>
                </div>
              </div>
              <hr
                className="my-2 text-gray-300 px-5
                    "
              />
              <div className="flex justify-start lg:justify-start">
                <button
                  onClick={() => handleComplete(currentHabit?._id)}
                  className="btn my-btn "
                >
                  Mark as Complete
                </button>
              </div>
            </div>
          </div>
          <div className="mt-65 -me-2 lg:me-0 lg:mt-0"></div>
          <div className="p-5">
            <h2 className="text-lg font-bold mb-4">
              Description :
            </h2>
            <text className="text-sm opacity-80 ">
              <p>
               {currentHabit?.description}
              </p>
            </text>
          </div>
        </div>
        <div className="text-center p-8">
          <Link to="/apps" className="btn my-btn ">
            Go Back
          </Link>
        </div>
      </div>

  );
};

export default Details;
