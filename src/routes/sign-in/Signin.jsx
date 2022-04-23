import {
	signInWithGooglePopup,
	createUserDocfromAuth,
} from '../../utils/firebase/firebase.utils';
import SignupForm from '../../components/sign-up-form/SignupForm';

const Signin = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocfromAuth(user);
	};

	return (
		<div>
			<h1>Sign in</h1>
			<button onClick={logGoogleUser}>Sign in with Google Pop</button>
			<SignupForm />
		</div>
	);
};
export default Signin;
