import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration, ProgressPlugin } from "webpack"
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server"

export interface BuildEnv {
  mode: "development" | "production"
  port: number
}

interface WebpackConfiguration extends Configuration {
  devServer?: WebpackDevServerConfiguration
}

export default (env: BuildEnv): WebpackConfiguration => ({
  entry: "./src/index.tsx",
  mode: env.mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new ProgressPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
})
