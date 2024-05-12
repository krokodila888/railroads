const { override, adjustStyleLoaders } = require("customize-cra");

module.exports = override(
  //  Configure the specified file as the SASS global file, you can use it without importing
  adjustStyleLoaders((rule) => {
    if (rule.test.toString().includes("scss")) {
      rule.use.push({
        loader: require.resolve("sass-resources-loader"),
        options: {
          resources: ["./src/styles/variables.scss"],
        },
      });
    }
  })
);
