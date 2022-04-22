import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/Home';
import Navigation from './routes/navigation/Navigation';
import Signin from './routes/sign-in/Signin';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="sign-in" element={<Signin />} />
			</Route>
		</Routes>
	);
};

export default App;
