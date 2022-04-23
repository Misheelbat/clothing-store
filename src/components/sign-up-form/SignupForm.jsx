import React, { useState } from 'react';
import FormInput from '../form-input/FormInput';
import Button from '../button/Button';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocfromAuth,
} from '../../utils/firebase/firebase.utils';

import './signupForm.style.scss';
const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

export default function SignupForm() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('password do not match');
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
			await createUserDocfromAuth(user, { displayName });
			setFormFields(defaultFormFields);
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('credentials already in use');
			} else {
				console.log('could not create user', error.message);
			}
		}
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					value={displayName}
					name="displayName"
					type="text"
					required
					onChange={handleChange}
				/>

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

				<FormInput
					label="Confirm Password"
					value={confirmPassword}
					name="confirmPassword"
					type="password"
					required
					onChange={handleChange}
				/>
				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
}
