import { motion } from "framer-motion";
import { Link } from "react-router";

const StartJourney = () => {
  return (
    <section className="relative  lg:py-15 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto py-5"
      >
        <h2 className="text-2xl lg:text-5xl font-bold text-habit-text mb-4 lg:leading-13">
          Build Consistency. Achieve Growth. <span className="color-primary ">Transform Your Life.</span>
        </h2>
        <p className="text-habit-text/70 mb-4 lg:mb-8">
          HabitFlow helps you track daily actions, stay accountable, and reach your goals — one habit at a time.
        </p>
        <Link to={'/add-habit'} className="btn my-btn-2 text-white px-8 py-3 rounded-full font-medium hover:bg-habit-accent transition-all duration-300">
          Add a new Habit now
        </Link>
      </motion.div>
       <section className="bg-habit-bg py-6 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto text-center px-4"
      >
        <form className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="input outline-0 border-[1px] py-6"
          />
          <button
            type="submit"
            className="btn my-btn hover:bg-habit-accent text-white px-6 py-6 rounded-lg font-medium transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
    </section>
  );
};

export default StartJourney;
