const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: path.resolve(__dirname, 'server/src/server.js'),
    output: {
        path: path.resolve(__dirname, 'server/dist'),
        filename: 'server.dist.js'
    },

    target: 'web',
    externals: [nodeExternals()],
    node: {
        fs: "empty",
        __dirname: true,
        __filename: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            }
        ]
    }
}