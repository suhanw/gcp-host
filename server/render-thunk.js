const renderThunk = () => async (request, h) => {
	let renderer; 
	try {
		renderer = (await import('./renderer')).default;
	} catch (error) {
		console.error(error)
		renderer = (request, h) => 'Error caught';
	}

	return renderer(request, h);
};

export default renderThunk;
