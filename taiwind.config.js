
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // make sure this line exists!
  ],
  theme: {
    extend: {
      colors: {
        habit: {
          primary: "#14B8A6",
          accent: "#F59E0B",
          bg: "#F9FAFB",
          text: "#1E293B",
        },
      },
    },
  },
  plugins: [],
};
