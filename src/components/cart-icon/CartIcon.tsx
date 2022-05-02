import { useSelector, useDispatch } from 'react-redux';
import {
	selectIsCartOpen,
	selectCartCount,
} from '../../store/cart/cart.selectors';
import { setOpen } from '../../store/cart/cart.actions';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cartIcon.style';
const CartIcon = () => {
	const dispatch = useDispatch();
	const cartCount = useSelector(selectCartCount);
	const open = useSelector(selectIsCartOpen);
	
	const toggleCart = () => {
		dispatch(setOpen(!open));
	};
	return (
		<CartIconContainer onClick={toggleCart}>
			<ShoppingIcon className="shopping-icon" />
			<ItemCount className="item-count">{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
