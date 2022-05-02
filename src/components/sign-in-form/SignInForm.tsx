import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
	googleSigninStart,
	emailSigninStart,
} from '../../store/user/user.action';

import FormInput from '../form-input/FormInput';
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button';

import './signInForm.style.scss';
const defaultFormFields = {
	email: '',
	password: '',
};
export default function SignInForm() {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		dispatch(googleSigninStart());
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			dispatch(emailSigninStart(email, password));
			setFormFields(defaultFormFields);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="sign-up-container">
			<h2>Already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					value={email}
					name="email"
					type="email"
					required
					onChange={handleChange}
				/>

				<FormInput
					label="Password"
					value={password}
					name="password"
					type="password"
					required
					onChange={handleChange}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogle}
					>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	);
}
