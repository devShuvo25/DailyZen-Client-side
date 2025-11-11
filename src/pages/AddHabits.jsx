import { motion } from "framer-motion";
import {
  CalendarIcon,
  PencilIcon,
  EyeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
/* **
"title": "Morning Meditation",
    "description": "Start your day with 10 minutes of peaceful meditation to clear your mind and set your intentions.",
    "category": "Morning",
    "reminderTime": "06:30 AM",
    "image": "https://i.ibb.co/morning-meditation.jpg",
    "userEmail": "sarah.jones@email.com",
    "userName": "Sarah Jones"
*/
const AddHabits = () => {
  const {user} = useAuth();
  const { instance } = useAxiosSecure();
  const handleAddHabits = (e) => {
    e.preventDefault();
    console.log("cliked");
    const newHabit = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      reminderTime: e.target.time.value,
      completion_history: [],
      current_streak: 0,
      created_at: new Date().toLocaleString(),
      image: e.target.image.value,
      user_email: e.target.email.value,
      user_name: e.target.name.value,
    };
    console.log(newHabit)
    instance
      .post("/add-habit", newHabit)
      .then((result) => {
        console.log(result.data);
        if (result.data?.insertedId) {
          Swal.fire({
            title: "Drag me!",
            icon: "success",
            draggable: true,
          });
          e.target.reset();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="bg-habit-bg min-h-screen text-habit-text mb-5  px-4">
      <div class="relative w-full h-[500px]">
        <img
          src="https://geediting.com/wp-content/uploads/2024/03/People-who-are-lazy-and-unproductive-in-life-often-display-these-behaviors.png"
          class="w-full h-full object-cover"
        />

        <div class="absolute inset-0 bg-black opacity-50"></div>

        <div class="absolute inset-1 flex flex-col items-center gap-5 justify-center text-white">
          <h1 class="text-5xl text-white font-bold ms-10 text-left ">
            Small Steps Today, Big Wins Tomorrow.
          </h1>
          <button className="btn border-0 my-btn-2">Explore</button>
        </div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-habit-primary my-8">
          Add a New <span className="color-primary">Habit</span>
        </h1>
        <p className="text-habit-text/70 text-lg opacity-70">
          Build consistency and track your habits daily. Fill out the form below
          to start.
        </p>
      </motion.div>

      {/* Form Section */}
      <motion.form
        onSubmit={handleAddHabits}
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
              <PencilIcon className="w-5 h-5 absolute top-2.5 left-3 text-habit-primary" />
              <input
                type="text"
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
              <CalendarIcon className="w-5 h-5 absolute top-2.5 left-3 text-habit-primary" />
              <select
                defaultValue="Select a category"
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
              <ClockIcon className="w-5 h-5 absolute top-2.5 left-3 text-habit-primary" />
              <input
                type="time"
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
              <PencilIcon className="w-5 h-5 absolute top-2.5 left-3 text-habit-primary" />
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
              <PencilIcon className="w-5 h-5 absolute top-2.5 left-3 text-habit-primary" />
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
              <PencilIcon className="w-5 h-5 absolute top-2.5 left-3 text-habit-primary" />
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
            className=" w-[120px] my-btn-2 hover:bg-habit-accent text-white py-3 rounded-lg font-medium transition-all duration-300"
          >
            Go back
          </button>
          <button
            type="submit"
            className=" w-[120px]  my-btn hover:bg-habit-accent text-white py-3 rounded-lg font-medium transition-all duration-300"
          >
            Add Habit
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddHabits;
