import React, { useEffect, useEffectEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import ProgressBar from "../components/ProgressBar";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Details = () => {
  const { user } = useAuth();
  const location = useLocation();
  console.log(location);
  const { instance } = useAxiosSecure();
  const [currentHabit, setCurrentHabit] = useState(null);
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
      <div>
        <div>
          <div className="flex flex-col lg:flex-row h-[400px] gap-10 lg:p-8 ">
            <div className="flex justify-center lg:w-[35%]">
              <img
                className="w-full rounded-2xl"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT00c4CX6Qna0gefZZsonCZ9G5u2cNzBp12bw&s"
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
              <div>
                <div className="flex justify-centr items-center gap-15">
                  <div className="h-[100px] w-[100px] text-center">
                    <ProgressBar />
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
              <div>
                <button
                  onClick={() => handleComplete(currentHabit?._id)}
                  className="btn my-btn"
                >
                  Mark as Complete
                </button>
              </div>
            </div>
          </div>
          <div className="mt-65 -me-2 lg:me-0 lg:mt-0"></div>
          <div className="p-5">
            <h2 className="text-lg font-bold mb-4">
              {currentHabit?.description}
            </h2>
            <text className="text-sm opacity-80 ">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
                aut cupiditate accusantium nobis molestias accusamus temporibus
                aliquid repudiandae consequuntur, vero sapiente necessitatibus
                commodi illum dolor similique ipsum vitae eligendi voluptatibus
                saepe expedita iure nemo sed reprehenderit. Tempore fuga,
                veritatis mollitia illo adipisci dolores. Corporis dolores
                quidem exercitationem a rerum commodi temporibus cum, quam
                assumenda nihil quisquam ipsam, dolorum quod possimus et
                voluptatum repellendus! Harum nisi recusandae labore sit fugit
                quod quis, aperiam incidunt nihil pariatur, accusamus soluta
                ducimus alias. Quam at accusantium sint inventore. Aut commodi
                reprehenderit obcaecati ipsum numquam libero adipisci, aperiam
                iure laudantium est? Excepturi laborum consequuntur quia rerum,
                tempora odit, tenetur illo dolorum ipsam iusto facilis id!
                Magnam ratione quasi rem ducimus, voluptas ipsum nihil natus
                minus ex sunt, quia laboriosam eius possimus nostrum vero
                laborum sit velit quibusdam nemo harum voluptatibus eos non hic
                beatae! Nam.
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
    </div>
  );
};

export default Details;
