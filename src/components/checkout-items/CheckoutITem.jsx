import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkoutItems.style.scss';

const CheckoutItem = ({ checkoutItem }) => {
	const { addItemsToCart, removeItemsFromCart, deleteItemFromCart } =
		useContext(CartContext);
	const { imageUrl, name, price, quantity } = checkoutItem;

	const removeItemHandler = () => removeItemsFromCart(checkoutItem);
	const addItemHandler = () => addItemsToCart(checkoutItem);
	const deleteItemHandler = () => deleteItemFromCart(checkoutItem);

	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imageUrl} alt={name} />
			</div>
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
			<div onClick={deleteItemHandler} className="remove-button">
				&#10005;
			</div>
		</div>
	);
};
export default CheckoutItem;
