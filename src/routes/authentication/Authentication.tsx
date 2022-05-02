import SignupForm from '../../components/sign-up-form/SignupForm';
import SignInForm from '../../components/sign-in-form/SignInForm';

import { AuthContainer } from './authentication.style';
const Signin = () => {
	return (
		<AuthContainer>
			<SignInForm />
			<SignupForm />
		</AuthContainer>
	);
};
export default Signin;
