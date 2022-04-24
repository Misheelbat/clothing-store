import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cartIcon.style.scss';
const CartIcon = () => {
	const { setOpen, open } = useContext(CartContext);
	return (
		<div onClick={() => setOpen(!open)} className="cart-icon-container">
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">0</span>
		</div>
	);
};

export default CartIcon;
