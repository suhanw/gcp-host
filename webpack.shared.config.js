'use strict';

const LoadablePlugin = require('@loadable/webpack-plugin')
const webpack = require('webpack');

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

	devtool: 'source-map',

	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},

	resolve: {
		extensions: ['.js', '.less'],
	},

	plugins: [
		new LoadablePlugin({ // to enable SSR code splitting
			filename: `loadable-stats.json`, // list of webpack chunk assets
			writeToDisk: true 
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
		}),
	]
};
