'use strict';

console.log('using webpack server config', process.env.NODE_ENV)

const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const sharedConfig = require('./webpack.shared.config.js');

let config = {
	target: 'node',

	node: {
		__filename: true,
		__dirname: true,
	},

	entry: './server/index.js',

	output: {
		path: path.join(__dirname, './build/server'),
		filename: 'bundle.js',
	},

	externals: [webpackNodeExternals({
		allowlist: [/^webpack\/container\/reference\//],
	})],

	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{
						loader: 'css-loader',
						options: {
							modules: {
								exportOnlyLocals: true,
								exportLocalsConvention: 'camelCase',
								localIdentName: '[local]_[hash:base64:5]',
							},
						}
					},
					'less-loader',
				]
			},
		],
	},
};

module.exports = merge(sharedConfig, config);
