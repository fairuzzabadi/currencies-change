// import 'babel-polyfill';
const MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      path = require('path');

module.exports = {
    entry: {
        'polyfills': 'babel-polyfill',
        'main': './source/client.js'
    },
    output: {
        path: path.resolve(__dirname + './'),
        filename: '[name].js'
    },
    devServer: {
        inline: true,
        contentBase: './public',
        port: 3000
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [
                    'json-loader'
                ]
            }
        ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "app.css",
      })
    ]
};