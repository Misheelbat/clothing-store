import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './store/user/user.action';

import Spinner from './components/spinner/Spinner';
import { GlobalStyle } from './global.style';

const Home = lazy(() => import('./routes/home/Home'));
const Shop = lazy(() => import('./routes/shop/Shop'));
const Checkout = lazy(() => import('./routes/checkout/Checkout'));
const Navigation = lazy(() => import('./routes/navigation/Navigation'));
const Authentication = lazy(() =>
	import('./routes/authentication/Authentication')
);

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkUserSession());
	}, []);

	return (
	
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<Navigation />}>
						<Route index element={<Home />} />
						<Route path="shop/*" element={<Shop />} />
						<Route path="auth" element={<Authentication />} />
						<Route path="checkout" element={<Checkout />} />
					</Route>
				</Routes>
			</Suspense>
	
	);
};

export default App;
