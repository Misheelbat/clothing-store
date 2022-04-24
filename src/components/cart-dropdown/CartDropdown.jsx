import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button from '../button/Button';
import './cartDropdown.style.scss';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	return (
		<div className="cart-dropdown-container">
			<div className="cart-items" />
			<Button>GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
