import {
	signInWithGooglePopup,
	createUserDocfromAuth,
} from '../../utils/firebase/firebase.utils';

const Signin = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocfromAuth(user);
	};

	return (
		<div>
			<h1>Sign in</h1>
			<button onClick={logGoogleUser}>Sign in with Google</button>
		</div>
	);
};
export default Signin;