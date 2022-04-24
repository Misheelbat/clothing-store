import { createContext, useState, useEffect } from 'react';
import {
	onAuthStateChangedListener,
	createUserDocfromAuth,
} from '../utils/firebase/firebase.utils';
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsub = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocfromAuth(user);
			}
			setCurrentUser(user);
		});

		return unsub;
	}, []);
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
