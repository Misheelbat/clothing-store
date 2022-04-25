import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button from '../button/Button';
import './productCard.style.scss';

const ProductCard = ({ product }) => {
	const { addItemsToCart } = useContext(CartContext);
	const { name, price, imageUrl } = product;
	
	const addProductToCart = () => {
		addItemsToCart(product);
	};
	return (
		<div className="product-card-container">
			<img src={imageUrl} alt={`${name}`} />
			<div className="footer">
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</div>
			<Button onClick={addProductToCart} buttonType="inverted">
				ADD TO CARD
			</Button>
		</div>
	);
};

export default ProductCard;
