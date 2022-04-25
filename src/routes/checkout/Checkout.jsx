import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-items/CheckoutITem';

import './checkout.style.scss';
const Checkout = () => {
	const { cartItems } = useContext(CartContext);
	return (
		<div className="checkout-container">
			<div className="checkout-header">
				<span>Product</span>
				<span>Description</span>
				<span>Quantity</span>
				<span>Price</span>
				<span>Remove</span>
			</div>
			{cartItems.map((item) => (
				<CheckoutItem checkoutItem={item} key={item.id} />
			))}
		</div>
	);
};

export default Checkout;
