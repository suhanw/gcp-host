import React, { useEffect } from 'react';
import loadable from '@loadable/component';
import style from './style';
import Footer from '../Footer';
// const Footer = loadable(() => import('../Footer'));
import Header from '../Header';

const App = () => {
	useEffect(() => {
		console.log('useEffect')
	}, [])
	
	return (
		<div className={style.app}>
			<Header />
			Hello world
			<Footer />
		</div>
	);
}

export default App; 
