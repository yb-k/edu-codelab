/* vue-cli config options */
const { NODE_ENV, SOURCE_MAP, BASE_URL, OUTPUT_DIR, ASSETS_DIR, PROXY_SERVER } =
  process.env;
const isProduction = NODE_ENV === "production";
const sourceMap = isProduction && SOURCE_MAP === "true";
const publicPath = BASE_URL || "/";
const outputDir = OUTPUT_DIR || "dist";
const assetsDir = ASSETS_DIR || "";
const proxyServer = PROXY_SERVER || "";

const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true, // babel loader를 사용하여 설치된 pacakge 내의 소스를 변환할지에 대한 여부
  publicPath, // Public Path, 빌드된 html 파일 내의 src 경로 확인 (like contextRoot)
  outputDir, // 빌드 경로
  assetsDir, // 빌드시 정적 콘텐츠에 대한 위치
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      // the source template
      template: "public/index.html",
      // output as dist/index.html
      filename: "index.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "hello-my-vue",
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  css: {
    sourceMap: sourceMap,
  },
  devServer: {
    proxy: proxyServer,
    client: {
      overlay: {
        warnings: false, // lint warning가 뜨면 화면에 오버레이할 지 여부
        errors: false, // lint error가 뜨면 화면에 오버레이할 지 여부
      },
    },
  },
  productionSourceMap: sourceMap, // build시 sourcemap 생성 여부
});
