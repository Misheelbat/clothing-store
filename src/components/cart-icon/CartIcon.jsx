import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cartIcon.style';
const CartIcon = () => {
	const { setOpen, open, cartCount } = useContext(CartContext);
	return (
		<CartIconContainer onClick={() => setOpen(!open)}>
			<ShoppingIcon className="shopping-icon" />
			<ItemCount className="item-count">{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
