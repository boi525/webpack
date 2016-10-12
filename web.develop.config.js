/*
* @Author: 虚竹
* @Date:   2016-10-11 17:07:56
* @Last Modified by:   虚竹
* @Last Modified time: 2016-10-12 17:43:29
*/

'use strict';
var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');


module.exports = {
    entry:[
    	'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
    	path.resolve(__dirname, 'app.js')
    ],
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/, // Only .css files
                loader: ExtractTextPlugin.extract("style-loader", "css-loader") // Run both loaders
            },
            {
                 test: /\.scss$/,
                 loader: ExtractTextPlugin.extract('style', "css!sass")
             },
             {
                  test: /\.(png|jpg)$/,
                  loader: 'url?limit=25000&name=images/[name].[ext]'
             }



        ]

    },

    plugins: [
    	new HtmlWebpackPlugin({
            title: 'Custom template using Handlebars',
            template: 'index.html'
        }),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("app.css"),
        new OpenBrowserPlugin()
    ]
}
