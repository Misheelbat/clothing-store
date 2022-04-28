import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selectors';
import {
	addItemsToCart,
	removeItemsFromCart,
	deleteItemFromCart,
} from '../../store/cart/cart.actions';
import {
	CheckoutItemsContainer,
	ImageContainer,
	RemoveButton,
	Quantity,
	Name,
	Price,
} from './checkout-item.style';

const CheckoutItem = ({ checkoutItem }) => {
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();
	const { imageUrl, name, price, quantity } = checkoutItem;

	const removeItemHandler = () =>
		dispatch(removeItemsFromCart(cartItems, checkoutItem));
	const addItemHandler = () =>
		dispatch(addItemsToCart(cartItems, checkoutItem));
	const deleteItemHandler = () =>
		dispatch(deleteItemFromCart(cartItems, checkoutItem));

	return (
		<CheckoutItemsContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<Name>{name}</Name>
			<Quantity>
				<div className="arrow" onClick={removeItemHandler}>
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div onClick={addItemHandler} className="arrow">
					&#10095;
				</div>
			</Quantity>
			<Price>{price}</Price>
			<RemoveButton onClick={deleteItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemsContainer>
	);
};
export default CheckoutItem;
