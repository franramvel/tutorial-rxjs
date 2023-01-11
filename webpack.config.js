const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
    watch: true,
    mode: 'none',//development permite ver el codigo generado de manera un poco más detallada, en production lo comprime completamente
    entry: {
        bundle: path.resolve(__dirname, 'src/index.ts')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, "src")]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                include: [path.resolve(__dirname, "src/assets/style")]
            },
            {
                test: /\.(scss)$/,
                use: [
                    //para tener css distintos
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'assets/style/', name: '[name].min.css'}
                    },
                    "sass-loader"
                    //Para tener el css dentro del js
                    // {
                    //     // inject CSS to page
                    //     loader: 'style-loader'
                    // },
                    // {
                    //     // translates CSS into CommonJS modules
                    //     loader: 'css-loader'
                    // },
                    // {
                    //     // Run postcss actions
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         // `postcssOptions` is needed for postcss 8.x;
                    //         // if you use postcss 7.x skip the key
                    //         postcssOptions: {
                    //             // postcss plugins, can be exported to postcss.config.js
                    //             plugins: () => {
                    //                 [
                    //                     require('autoprefixer')
                    //                 ];
                    //             }
                    //         }
                    //     }
                    // },
                    // {
                    //     // compiles Sass to CSS
                    //     loader: 'sass-loader'
                    // }
                ]
            }

        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: false
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 8083,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    optimization: {
        emitOnErrors: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Index',
            filename: "index.html",
            template: 'src/index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: "src/assets/img", to: "assets/img" }
        //     ],
        // })
    ]
}