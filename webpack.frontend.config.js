const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlLoader = require('html-loader');
const cssLoader = require('css-loader');
const lessLoader = require('less-loader');
const autoPrefixer = require('auto-prefixer');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin')


module.exports = {
    target: "web",
    resolve: {
        extensions: ['.css', '.scss', '.js', '.jsx']
    },
    entry: './web/src/index.js',
    output: {
        path: path.resolve(__dirname, 'web/dist'),
        filename: '[name].dist.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                "@babel/plugin-syntax-dynamic-import",
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-optional-chaining"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },


    optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: 'all'
        },
        minimize: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'web/src/index.html'),
            filename: path.resolve(__dirname, 'web/dist/index.dist.html'),
            inject: true,
            minify: true,
        }),
        new BaseHrefWebpackPlugin({
            baseHref: '/'
        })
    ]
}
