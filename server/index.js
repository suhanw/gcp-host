import 'core-js';
import 'regenerator-runtime';
import Hapi from '@hapi/hapi';
import path from 'path';

const init = async () => {
	console.log({ NODE_ENV: process.env.NODE_ENV })
	
	const server = Hapi.server({
		port: process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : 3000,
		// host: 'localhost',
	});

	await server.register([
		require('@hapi/inert')
	])

	server.route({
		method: 'GET',
		path: '/{path*}',
		handler: async (request, h) => {
			const renderThunk = require('./render-thunk').default;
			const renderer = renderThunk();
			return await renderer(request, h);
		},
	});

	server.route({
		method: 'GET',
		path: '/client/{file*}',
		options: {
			auth: false,
			handler: {
				directory: {
					path: [
						path.resolve(__dirname, '../build/client')
					]
				}
			}
		},
	})

	await server.start();
	console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();
