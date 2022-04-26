import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button';

import { ProductCardContainer, ProductFooter } from './productCard.style';

const ProductCard = ({ product }) => {
	const { addItemsToCart } = useContext(CartContext);
	const { name, price, imageUrl } = product;

	const addProductToCart = () => {
		addItemsToCart(product);
	};
	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={`${name}`} />
			<ProductFooter>
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</ProductFooter>
			<Button
				onClick={addProductToCart}
				buttonType={BUTTON_TYPE_CLASSES.inverted}
			>
				ADD TO CARD
			</Button>
		</ProductCardContainer>
	);
};

export default ProductCard;
