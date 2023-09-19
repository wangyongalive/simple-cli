// @babel/preset-env  包含@babel/plugin-transform-modules-commonjs  将es6转为commonjs
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "10",
        },
      },
    ],
  ]
};
