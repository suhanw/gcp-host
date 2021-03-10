'use strict';

const LoadablePlugin = require('@loadable/webpack-plugin')
const webpack = require('webpack');
const path = require('path');

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

		modules: [
			path.resolve(__dirname),
			'node_modules'
		],

		alias: {
			'client': 'client',
			'server': 'server',
			'components': 'client/components',
			'partner': `client/partners/${process.env.PARTNER || 'boxed'}`,
		}
	},

	plugins: [
		new LoadablePlugin({ // to enable SSR code splitting
			filename: `loadable-stats.json`, // list of webpack chunk assets
			writeToDisk: true 
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
			'process.env.BUILD_ID': `"${process.env.BUILD_ID}"`,
			'process.env.PARTNER': `"${process.env.PARTNER || 'boxed'}"`,
			'PARTNER_SSR_ENABLED': !process.env.PARTNER || process.env.PARTNER === 'boxed',
		}),
	]
};
