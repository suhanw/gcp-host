import React, { useEffect } from 'react';
import loadable from '@loadable/component';
import style from './style';
const Footer = loadable(() => import('components/footer'));
const TopNav =  loadable(() => import('partner/components/top-nav'), { ssr: PARTNER_SSR_ENABLED }); // ONLY CSR
// import TopNav from 'partner/components/top-nav'; // SSR works but no initial CSS

const App = () => {
	useEffect(() => {
		console.log('useEffect')
	}, [])
	
	return (
		<div className={style.app}>
			<TopNav />
			Hello world again
			<Footer />
		</div>
	);
}

export default App; 
