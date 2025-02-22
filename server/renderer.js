import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import App from 'components/app';

const renderer = async (request, h) => {

	// This is the stats file generated by webpack loadable plugin
	const statsFile = path.resolve(__dirname, '../build/client/loadable-stats.json');

	// We create an extractor from the statsFile
	const extractor = new ChunkExtractor({ statsFile })
	// Wrap your application using "collectChunks"
	const jsx = extractor.collectChunks(<App />)
	// Render your application
	const html = ReactDOMServer.renderToString(jsx)
	// You can now collect your script tags
	const scriptTags = extractor.getScriptTags() // or extractor.getScriptElements();
	// You can also collect your "preload/prefetch" links
	const linkTags = extractor.getLinkTags() // or extractor.getLinkElements();
	// And you can even collect your style tags (if you use "mini-css-extract-plugin")
	const styleTags = extractor.getStyleTags() // or extractor.getStyleElements();

	// console.log({
	// 	styleTags, 
	// 	path: request.path,
	// }); 

	let remoteBundleScript = '';

	if (typeof REMOTE_ENTRY !== 'undefined' && Boolean(REMOTE_ENTRY)) {
		console.log({ REMOTE_ENTRY });
	}

	if (process.env.PARTNER && process.env.PARTNER !== 'boxed' && typeof REMOTE_ENTRY !== 'undefined' && Boolean(REMOTE_ENTRY)) {
		remoteBundleScript = `<script src="${process.env.NODE_ENV === 'production' ? `https://storage.googleapis.com/${process.env.PARTNER}-remote/build/client/` : 'http://localhost:8081/'}${REMOTE_ENTRY}"></script>`;
	}

	return h.response(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${process.env.PARTNER || 'boxed'} SSR App</title>
				${remoteBundleScript}
				${linkTags}
				${styleTags}
			</head>
			<body>
				<div id='ssr-app'>${html}</div>
				${scriptTags}
			</body>
		</html>
	`);
};

export default renderer;
