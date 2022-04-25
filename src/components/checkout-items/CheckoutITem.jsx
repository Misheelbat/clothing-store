import './checkoutItems.style.scss';

const CheckoutItem = ({ checkoutItem }) => {
	const { imgUrl, name, price, quantity } = checkoutItem;
	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imgUrl} alt={name} />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">{quantity}</span>
			<span className="price">{price}</span>
			<span className="price">{price}</span>
		</div>
	);
};
export default CheckoutItem;
