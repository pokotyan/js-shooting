const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require("path");

module.exports = (config, env) => {
  config.plugins = config.plugins.concat([new MonacoWebpackPlugin()]);

  return config;
};
