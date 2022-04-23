import React, { useState } from 'react';
import FormInput from '../form-input/FormInput';
import Button from '../button/Button';
import {
	signInWithGooglePopup,
	createUserDocfromAuth,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './signInForm.style.scss';
const defaultFormFields = {
	email: '',
	password: '',
};

export default function SignInForm() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocfromAuth(user);
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await signInAuthUserWithEmailAndPassword(email, password);
			console.log(res);
			setFormFields(defaultFormFields);
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('incorrect password');
					break;
				case 'auth/user-not-found':
					alert('no user with this email');
					break;
				default:
					console.log(error);
			}
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
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	);
}
