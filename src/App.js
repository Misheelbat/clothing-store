import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	onAuthStateChangedListener,
	createUserDocfromAuth,
} from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';

import Home from './routes/home/Home';
import Navigation from './routes/navigation/Navigation';
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/Shop';
import Checkout from './routes/checkout/Checkout';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsub = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocfromAuth(user);
			}
			dispatch(setCurrentUser(user));
		});

		return unsub;
	}, [dispatch]);
	
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
