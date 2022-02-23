const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');


module.exports = {
  mode: 'production', // production, development, none

  devtool: 'source-map',// false, eval, source-map (https://webpack.js.org/configuration/devtool/)

  target: 'web', // web, node

  entry: {
    bundle: './src/main.js', // 시작점
  },

  output: {
    path: path.resolve(__dirname, 'dist'), // 생성될 경로
    filename: '[name].js', // 경로 내 생성될 파일 명
  },
  resolve: {
    extensions: ['.js', '.json', '*'], // 지원하는 확장자 명
    alias: { // 별칭
      '@': path.resolve(__dirname, 'src/')
    },
  },
  module: {
    rules: [
      // loader 설정
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
        ],
      }
    ] 
  },
  // plugin 설정
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ], 

  optimization: {} // 최적화 관련 설정
}