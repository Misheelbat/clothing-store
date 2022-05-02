import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { addItemsToCart } from '../../store/cart/cart.actions';
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button';
import { ProductItem } from '../../store/products/products.type';
import { ProductCardContainer, ProductFooter } from './productCard.style';

type ProductCardProps = {
	product: ProductItem;
};
const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();
	const { name, price, imageUrl } = product;

	const addProductToCart = () => {
		dispatch(addItemsToCart(cartItems, product));
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
