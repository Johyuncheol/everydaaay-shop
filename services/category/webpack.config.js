// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

dotenv.config();

module.exports = {
  mode: "development",
  // 진입점 설정: 프로젝트의 메인 파일(entry point)을 지정합니다.
  entry: "./src/index.tsx",

  // 번들된 결과물 설정: 번들된 파일의 이름과 저장 위치를 설정합니다.
  output: {
    filename: "category/bundle.js", // 번들 파일 경로 및 이름 설정
    path: path.resolve(__dirname, "dist"), // 번들 파일이 생성될 경로
    publicPath: "/",
  },

  // 모듈 해석 설정: 파일 확장자를 어떻게 해석할지 설정합니다.
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // 해석할 파일 확장자 목록
  },

  // 모듈 규칙 설정: 특정 파일 확장자에 대한 로더 설정을 추가합니다.
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts 또는 .tsx 파일에 대한 규칙
        use: "ts-loader", // ts-loader를 사용하여 TypeScript 파일을 변환
        exclude: /node_modules/, // node_modules 폴더는 변환에서 제외
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg|mp4)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]", // 결과 파일 이름 설정
              outputPath: "category/assets/", // 결과 파일이 저장될 경로 설정
            },
          },
        ],
      },
    ],
  },

  plugins: [

    new CleanWebpackPlugin(),
    
    new HtmlWebpackPlugin({
      template: "./public/index.html", // index.html을 기본 템플릿으로 반영할 수 있도록 설정
      filename: "index/index.html", // 생성된 HTML 파일의 이름 및 경로 설정
    }),

    new webpack.ProvidePlugin({
      React: "react",
      process: "process/browser.js", //추가
    }),

    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),

  ],
  // 개발 서버 설정
  devServer: {
    static: {
      directory: path.join(__dirname, "dist/index"), // 정적 파일을 제공할 디렉터리
    },
    compress: true, // 압축 사용 여부
    port: 3002, // 개발 서버의 포트 번호
    historyApiFallback: {
      index: '/index/index.html',
    },
  },
};
