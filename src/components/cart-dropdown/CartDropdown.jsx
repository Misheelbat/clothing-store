import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';

import './cartDropdown.style.scss';
const CartDropdown = () => {
	const navigate = useNavigate();
	const { cartItems } = useContext(CartContext);
	const handleClick = () => {
		navigate('checkout');
	};
	return (
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{cartItems.map((item) => (
					<CartItem cartItem={item} key={item.id} />
				))}
			</div>
			<Button onClick={handleClick}>GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
