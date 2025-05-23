const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    "postcss-preset-env": {
      features: {
        "logical-properties-and-values": false,
      },
    },
  },
};

export default config;