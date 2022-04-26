import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import {
	CheckoutItemsContainer,
	ImageContainer,
	RemoveButton,
} from './checkoutItems.style';

const CheckoutItem = ({ checkoutItem }) => {
	const { addItemsToCart, removeItemsFromCart, deleteItemFromCart } =
		useContext(CartContext);
	const { imageUrl, name, price, quantity } = checkoutItem;

	const removeItemHandler = () => removeItemsFromCart(checkoutItem);
	const addItemHandler = () => addItemsToCart(checkoutItem);
	const deleteItemHandler = () => deleteItemFromCart(checkoutItem);

	return (
		<CheckoutItemsContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<span className="name">{name}</span>
			<span className="quantity">
				<div className="arrow" onClick={removeItemHandler}>
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div onClick={addItemHandler} className="arrow">
					&#10095;
				</div>
			</span>
			<span className="price">{price}</span>
			<RemoveButton onClick={deleteItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemsContainer>
	);
};
export default CheckoutItem;