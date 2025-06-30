module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // adjust as needed
  theme: {
    extend: {
      fontFamily: {
        tangerine: ["Tangerine", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};
