import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';

import {
	CartDropdownContainer,
	CartDropdownItems,
	EmptyContainer,
} from './cartDropdown.style';
const CartDropdown = () => {
	const navigate = useNavigate();
	const { cartItems } = useContext(CartContext);
	const handleClick = () => {
		navigate('/checkout');
	};

	return (
		<CartDropdownContainer>
			<CartDropdownItems>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem cartItem={item} key={item.id} />)
				) : (
					<EmptyContainer>Your Cart is Empty</EmptyContainer>
				)}
			</CartDropdownItems>
			<Button onClick={handleClick}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
