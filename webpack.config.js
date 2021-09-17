const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    // https://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config
    entry: {
        'dist/static/bundle': './src/js/main.js',
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
     devServer: {
        static: './dist',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new RemovePlugin({
            before: {
                root: '.',
                include: [
                    'dist'
                ],
                log: true,
                recursive: true
            },
            watch: {
                // parameters for "before watch compilation" stage.
            },
            after: {
                // parameters for "after normal and watch compilation" stage.
            }
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/img', to: './dist/img', force: true },
                { from: './src/html', to: './dist', force: true },
            ],
            options: {}
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};

