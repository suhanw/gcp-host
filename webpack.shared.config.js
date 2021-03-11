'use strict';

const LoadablePlugin = require('@loadable/webpack-plugin')
const webpack = require('webpack');
const path = require('path');

let remoteLoadableStats = {};

if (process.env.PARTNER && process.env.PARTNER !== 'boxed') {
	remoteLoadableStats = require(process.env.NODE_ENV === 'production' ? './remote-build/client/loadable-stats.json' : '../gcp-remote/build/client/loadable-stats.json');
}

if (remoteLoadableStats && remoteLoadableStats.assetsByChunkName && remoteLoadableStats.assetsByChunkName.remote && remoteLoadableStats.assetsByChunkName.remote[0]) {
	console.log({
		remoteEntry: remoteLoadableStats.assetsByChunkName.remote[0]
	}); 
}

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
			'REMOTE_ENTRY': `"${(remoteLoadableStats && remoteLoadableStats.assetsByChunkName && remoteLoadableStats.assetsByChunkName.remote && remoteLoadableStats.assetsByChunkName.remote[0]) || ''}"`,
			'PARTNER_SSR_ENABLED': !process.env.PARTNER || process.env.PARTNER === 'boxed',
		}),
	]
};
