const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { Script } = require("vm");

module.exports = (env, argv) => {
  function isDevelopment() {
    return argv.mode === "development";
  }
  const config = {
    entry: { editor: "./src/editor.js", script: "./src/script.js" },
    output: {
      filename: isDevelopment()
        ? "art-hello-gutenberg-[name].bundle.js"
        : "art-hello-gutenberg-[name].bundle.min.js",
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDevelopment()
          ? "art-hello-gutenberg-[name].style.css"
          : "art-hello-gutenberg-[name].style.min.css",
      }),
    ],
    mode: "development",
    devtool: isDevelopment() ? "cheap-module-source-map" : "eval-source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    pragma: "wp.element.createElement",
                    pragmaFrag: "wp.element.Fragment",
                    development: isDevelopment(),
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [postcssPresetEnv(/* pluginOptions */)],
                },
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      lodash: "lodash",
      "@wordpress/blocks": ["wp", "blocks"],
      "@wordpress/i18n": ["wp", "i18n"],
      "@wordpress/primitives": ["wp", "primitives"],
      "@wordpress/block-editor": ["wp", "blockEditor"],
      "@wordpress/block-library": ["wp", "blockLibrary"],
      "@wordpress/components": ["wp", "components"],
      "@wordpress/data": ["wp", "data"],
      "@wordpress/element": ["wp", "element"],
      "@wordpress/html-entities": ["wp", "htmlEntities"],
      "@wordpress/core-data": ["wp", "coreData"],
      "@wordpress/date": ["wp", "date"],
    },
    optimization: {
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
  };

  return config;
};
