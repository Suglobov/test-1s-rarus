const path = require('path');
// const webpack = require('webpack');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');


const config = {
    target: 'web',
    devtool: 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './js/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: './js/[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'view',
            filename: 'index.html',
            template: 'index.html',
        }),
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'data', to: 'data' },
            ],
        }),
    ],
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }],
    },
};

module.exports = (_env, argv) => {
    if (argv.mode === 'production') {
        config.output.path = path.resolve(__dirname, 'build');
    }

    return config;
};
