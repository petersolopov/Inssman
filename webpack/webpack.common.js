const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: {
      background: path.resolve(__dirname, "../src/background", "background.ts"),
      options: path.resolve(__dirname, "../src/options", "options.tsx"),
      'editor.worker': path.resolve(__dirname, '../node_modules/monaco-editor/esm/vs/editor/editor.worker.js'),
		'json.worker': path.resolve(__dirname, '../node_modules/monaco-editor/esm/vs/language/json/json.worker'),
		'css.worker': path.resolve(__dirname, '../node_modules/monaco-editor/esm/vs/language/css/css.worker'),
		'html.worker': path.resolve(__dirname, '../node_modules/monaco-editor/esm/vs/language/html/html.worker'),
		'ts.worker': path.resolve(__dirname, '../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker')
   },
   output: {
      path: path.join(__dirname, "../", "dist"),
      // filename: (pathData) => {
      //    return (pathData.chunk.name === 'options') ? '[name]/[name].[contenthash].js' : '[name]/[name].js';
      //  },
      filename: '[name]/[name].js',
      clean: true
   },
   resolve: {
      roots: [path.resolve('./src')],
      extensions: [".ts", '.tsx', ".js",  ".jsx", ".svg"],
      alias: {
         src: path.resolve(__dirname, '..', 'src'),
         models: path.resolve(__dirname, '..','src', 'models'),
         options: path.resolve(__dirname, '..', 'src', 'options'),
         components: path.resolve(__dirname, '..', 'src', 'options', 'components'),
         assets: path.resolve(__dirname, '..', 'src', 'assets'),
      },
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: [{loader : "babel-loader"}, {loader : "ts-loader"}],
            exclude: /node_modules/,
         },
         {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", "postcss-loader"],
         },
         {
            test: /\.ttf$/,
            use: ['file-loader'],
            exclude: /node_modules/,
         },
         {
            test: /\.svg/,
            use: ["@svgr/webpack"],
         },
         // {
         //    test: /\.html$/,
         //    loader: 'html-loader'
         // },
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         inject: true,
         template: './src/options/options.html',
         filename:  'options/options.html',
         chunks: ['options']
      }),
      new CopyPlugin({
         patterns: [
            {from : "src/assets/images", to: "assets/images"},
            {from : "src/manifest.json", to: "."},
         ]
      }),
      new MiniCssExtractPlugin({
         filename: "options/styles.css",
         chunkFilename: "styles.css"
       }),
   ],
};