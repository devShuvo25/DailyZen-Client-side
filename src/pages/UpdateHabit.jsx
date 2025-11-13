import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
const UpdateHabit = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { instance } = useAxiosSecure();
  const [currentHabit, setCurrentHabit] = useState(null);
  const navigate = useNavigate();
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
  // handle update habit
  const handleUpdate = (e, id) => {
    e.preventDefault();
    const updatedHabit = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      reminderTime: e.target.time.value,
      image: e.target.image.value,
      user_email: e.target.email.value,
      user_name: e.target.name.value,
    };

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
        confirmButtonText: "Yes, Update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          instance
            .patch(`/update-my-habit/${id}`, updatedHabit)
            .then((result) => {
              if (result.data.modifiedCount) {
                swalWithBootstrapButtons.fire({
                  title: "Updated!",
                  text: "Your habit has been updated.",
                  icon: "success",
                });
                navigate('/my-habits')
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire({
                  title: "Cancelled",
                  text: "Your currnt data is safe :)",
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
  const {
    _id,
    title,
    category,
    reminderTime,
  } = currentHabit || {};
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-habit-primary my-8">
          Update your <span className="color-primary">Habit</span>
        </h1>
        <p className="text-habit-text/70 text-lg opacity-70">
          Keep your information up to date to personalize your habit tracking
          experience.
        </p>
      </motion.div>
      <motion.form
        onSubmit={(e) => handleUpdate(e, _id)}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-full mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <div className="grid grid-cols-3 gap-5">
          {/* Habit Name */}
          <div>
            <label className="block text-habit-text font-medium mb-1">
              Habit Title
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue={title}
                name="title"
                placeholder="Enter Habit title"
                className="input w-full outline-0"
              />
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-habit-text font-medium mb-1">
              Category
            </label>
            <div className="relative">
              <select
                defaultValue={category}
                name="category"
                className="select outline-none w-full"
              >
                <option disabled={true}>Select a category</option>
                <option>Morning</option>
                <option>Work</option>
                <option>Fitness</option>
                <option>Evening</option>
                <option>Study</option>
              </select>
            </div>
          </div>

          {/* Reminder Time */}
          <div>
            <label className="block text-habit-text font-medium mb-1">
              Reminder Time
            </label>
            <div className="relative">
              <input
                type="time"
                defaultValue={reminderTime}
                name="time"
                className="input w-full outline-none"
              />
            </div>
          </div>
          {/* Habit Name */}
          <div>
            <label className="block text-habit-text font-medium mb-1">
              User Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                readOnly
                defaultValue={user?.displayName}
                placeholder="User Name"
                className="input w-full outline-0"
              />
            </div>
          </div>
          {/* Habit Name */}
          <div>
            <label className="block text-habit-text font-medium mb-1">
              User Email
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue={user?.email}
                readOnly
                name="email"
                placeholder="User Email"
                className="input w-full outline-0"
              />
            </div>
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-habit-text font-medium mb-1">
              Image(Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                name="image"
                placeholder="PhotoURl -(Optional)"
                className="input w-full outline-0"
              />
            </div>
          </div>
        </div>
        {/* Short Description */}
        <div>
          <label className="block text-habit-text font-medium mb-1">
            Short Description
          </label>
          <textarea
            placeholder="Why do you want to build this habit?"
            name="description"
            className="input w-full h-20 resize-none outline-none focus:outline-0 "
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end items-center gap-8">
          <button
            type="button"
            className=" w-[120px] my-btn-2 hover:bg-habit-accent cursor-pointer text-white py-3 rounded-lg font-medium transition-all duration-300"
          >
            Go back
          </button>
          <button
            type="submit"
            className=" w-[120px] cursor-pointer  my-btn hover:bg-habit-accent text-white py-3 rounded-lg font-medium transition-all duration-300"
          >
            Update
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default UpdateHabit;
