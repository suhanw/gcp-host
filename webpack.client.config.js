'use strict'; 

console.log('using webpack client config', process.env.NODE_ENV)

const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sharedConfig = require('./webpack.shared.config.js');

const port = 8080;

const config = {
	target: 'web',

	entry: './client/index.js', 

	output: {
		path: path.join(__dirname, './build/client'),
		// publicPath: process.env.NODE_ENV === 'production' ? `https://storage.googleapis.com/gcp-host/build/client/` : `http://localhost:${port}/`, 
		publicPath: process.env.NODE_ENV === 'production' ? `build/client/` : `http://localhost:${port}/`, 
		filename: `scripts/bundle.js`,
	},

	devServer: { 
		port: port, 
		liveReload: true
	},

	plugins: [
		new MiniCssExtractPlugin({ // extracts css from bundle
			filename: `styles/bundle.css`,
		}),
	],

	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								exportLocalsConvention: 'camelCase',
								localIdentName: '[local]_[hash:base64:5]',
							},
						},
					},
					'less-loader',
				],
			},
		],
	},
};

module.exports = merge(sharedConfig, config);
