import { useSelector } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { selectCartTotal } from '../../store/cart/cart.selectors';
import { BUTTON_TYPE_CLASSES } from '../button/Button';

import {
	PaymentFormContainer,
	FormContainer,
	PayButton,
} from './paymentForm.style';
import { useState } from 'react';
const PaymentForm = () => {
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);
	const stripe = useStripe();
	const elements = useElements();
	const amount = useSelector(selectCartTotal);
	const { currentUser } = useSelector((state) => state.user);

	const paymentHandler = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) return;
		setIsProcessingPayment(true);
		const response = await fetch('/.netlify/functions/create-payment-intent', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: amount * 100 }),
		}).then((res) => res.json());
		const clientSecret = response.paymentIntent.client_secret;
		console.log(clientSecret);

		const paymentResult = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				},
			},
		});
		setIsProcessingPayment(false);
		if (paymentResult.error) {
			alert(paymentResult.error);
		} else {
			if (paymentResult.paymentIntent.status === 'succeeded') {
				alert('payment successful');
			}
		}
	};
	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment:</h2>
				<CardElement />
				<PayButton
					isLoading={isProcessingPayment}
					buttonType={BUTTON_TYPE_CLASSES.inverted}
				>
					Pay now
				</PayButton>
			</FormContainer>
		</PaymentFormContainer>
	);
};

export default PaymentForm;
