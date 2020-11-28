const path = require("path");
const autoprefixer = require("autoprefixer");
// const ExtractCSS = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = process.env.WEBPACK_ENV; // WEBPACK_ENV // cross-env
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ENTRY_FILE,
    mode: MODE,
    module: { // module을 발견할 때마다, 다음과 같은 rules를 따르라고 하고 있음 
        rules: [
            {
                // scss확장자파일을 만날때 마다, 어떤 loader를 실행
                test: /\.(scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // webpack은 아래서 부터 위로 코드가 실행됨 
                        loader: "css-loader"
                    },
                    {
                        // 코드의 번역 뿐만 아니라 호환성을 부여
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                  [
                                    'autoprefixer',
                                    {
                                      //options
                                      overrideBrowserslist: "cover 99.5%"
                                    },
                                  ]
                                ]
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ] // MiniCssExtractPlugin // ExtractCSS
};

module.exports = config;