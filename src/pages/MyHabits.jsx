import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaArrowLeft, FaFlagCheckered } from "react-icons/fa";
import { GiCheckeredFlag } from "react-icons/gi";
import { GrWheelchairActive } from "react-icons/gr";
import { IoSunnyOutline } from "react-icons/io5";
import { MdHourglassEmpty } from "react-icons/md";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { Link, useLocation } from "react-router";
import Swal from "sweetalert2";
import Spinners from "../components/Spinners";

const MyHabits = () => {
  const { instance } = useAxiosSecure();
  const { user } = useAuth();
  const [myhabits, setMyHabits] = useState([]);
  const [habits,setHabits] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  const location = useLocation();
      useEffect(() => {
        setIsLoading(true)
          instance.get('/all-habits')
          .then(reslut => {
              setHabits(reslut.data)
          })
          .catch(err => {
              console.log(err)
          })
      },[instance])
  useEffect(() => {
    instance
      .get(`/my-habits?email=${user?.email}`)
      .then((result) => {
        console.log(result.data);
        setMyHabits(result?.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [instance, user]);

  const totalCompleted = myhabits.filter(habit => habit.completion_history.includes(new Date().toISOString().split('T')[0]));

  // handle delete
  const handleDelete = (id) => {

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
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
              setIsLoading(true)
          instance.delete(`/delet-this-habit/${id}`).then((result) => {
            console.log(result.data);
            if (result.data.deletedCount){
              const remainingHabit = myhabits.filter(h => h._id !== id);
              setMyHabits(remainingHabit)
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              setIsLoading(false);
            }
            else if (
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                if (result) {
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

  return (
    
    <div>
      <title>My Habits</title>
      <div class="relative w-full lg:h-[500px]">
        <img
          src="https://www.themodestman.com/wp-content/uploads/2025/07/image6-44.jpg"
          class="w-full h-full object-cover"
        />

        <div class="absolute inset-0 bg-black opacity-50"></div>

        <div class="absolute inset-1 flex flex-col items-center gap-5 justify-center text-white">
          <h1 class="text-2xl lg:text-5xl text-white font-bold ms-10 text-left ">
            Small Steps Today, Big Wins Tomorrow.
          </h1>
          <h1 className="text-center text-xl font-semibold">
            You’ve completed 5 habits today! Keep up the great streak!”
          </h1>
          <button className="btn border-0 my-btn-2">Explore</button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-col gap-2 justify-center items-center my-3 mb-10">
          <h1 className="text-4xl font-semibold">
            My <span className="color-primary">Habits</span>
          </h1>
          <h3>Track your daily progress and stay consistent</h3>
          <p className="opacity-70 text-sm">
            Stay on track with your daily goals. Review your active habits,
            check your streaks, and keep growing — one day at a time.
          </p>
        </div>
        {/* card */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 my-10">
          <div className="  bg-green-100  flex flex-col items-center justify-center gap-2 rounded-lg">
            <IoSunnyOutline size={35} className="color-acent" />
            <h3 className="text-xl font-semibold">Habits Added</h3>
            <div className="rounded-[50%]  h-[70px] w-[70px] flex justify-center items-center">
              <h1 className="text-6xl font-bold color-primary">
                {myhabits.length}
              </h1>
            </div>
          </div>
          <div className="  bg-green-100  flex flex-col items-center justify-center gap-2 rounded-lg">
            <CiCalendarDate size={35} className="color-acent" />
            <h3 className="text-xl font-semibold">Today's Date</h3>
            <h1 className="text-6xl font-bold color-primary">{today}</h1>
          </div>
          <div className="  bg-green-100  flex flex-col items-center justify-center gap-2 rounded-lg">
            <GiCheckeredFlag size={35} className="color-acent" />
            <h3 className="text-xl font-semibold">Completed Today</h3>
            <h1 className="text-6xl font-bold color-primary">{totalCompleted.length}</h1>
          </div>
          <div className="  bg-green-100 flex flex-col items-center justify-center gap-2 rounded-lg">
            <GrWheelchairActive size={35} className="color-acent" />
            <h3 className="text-xl font-semibold">Active Habits</h3>
            <h1 className="text-6xl font-bold color-primary">{habits.length}</h1>
          </div>
        </div>
        {/* table of my  habits */}
        {
          
          
          isLoading? <Spinners/> :
          myhabits.length !== 0? 
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="color-acent">Category</th>
                <th className="color-acent">Title</th>
                <th className="color-acent">Current Streak</th>
                <th className="color-acent">Created Date</th>
                <th className="color-acent">Update</th>
                <th className="color-acent">Delete</th>
                <th className="color-acent">Mark Complete</th>
              </tr>
            </thead>
            {myhabits?.map((myhabit) => {
              return (
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>{myhabit.title}</th>
                    <td>{myhabit.category || ""}</td>
                    <td>Purple</td>
                    <td>17/05/2025</td>
                    <th>
                      <Link
                        to={"/update-habit"}
                        state={myhabit._id}
                        className="btn btn-info btn-xs"
                      >
                        Update
                      </Link>
                    </th>
                    <th>
                      <button
                        onClick={() => handleDelete(myhabit._id)}
                        className="btn btn-warning btn-xs"
                      >
                        Delete
                      </button>
                    </th>
                    <th className="text-center">
                      <button onClick={() => handleComplete(myhabit._id)} className="btn my-btn btn-xs">Tap to Complete</button>
                    </th>
                  </tr>
                </tbody>
              );
            })}

            {/* foot */}
          </table>
        </div> 
        :
        <div className="flex flex-col items-center justify-center gap-3">
          <MdHourglassEmpty size={40} color="#F59E0B" />
         <h1 className="text-4xl font-semibold">No Habits added yet</h1>
        <p className="opacity-75 text-sm">Please add a new habit</p>
        <Link to={'/add-habit'} className="btn my-btn">Add a new habit</Link>
        </div>
        
        
        }
      </div>
      <div className='flex justify-center items-center py-5'>
                    <Link to={'/'} className='btn my-btn'><span><FaArrowLeft /></span> Back to Home</Link>
                  </div>
    </div>
  );
};

export default MyHabits;
