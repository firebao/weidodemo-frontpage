module.exports = {
  presets: ["@vue/babel-preset-app"],
  plugins: [
    [
      "import",
      {
        libraryName: "view-design",
        libraryDirectory: "src/components"
      }
    ]
  ]
};
