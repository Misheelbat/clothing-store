import SignupForm from '../../components/sign-up-form/SignupForm';
import SignInForm from '../../components/sign-in-form/SignInForm';

import './authentication.style.scss';
const Signin = () => {
	return (
		<div className="auth-container">
			<SignInForm />
			<SignupForm />
		</div>
	);
};
export default Signin;
