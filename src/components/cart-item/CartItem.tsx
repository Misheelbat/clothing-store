import { FC, memo } from 'react';
import { CartItemContainer, ItemDetails } from './cartItem.style';
import { CartItem as CartProduct } from '../../store/cart/cart.types';

type CartItemProps = {
	cartItem: CartProduct;
};
const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
	const { name, quantity, imageUrl, price } = cartItem;
	return (
		<CartItemContainer>
			<img src={imageUrl} alt={name} />
			<ItemDetails>
				<span className="name">{name}</span>
				<span className="price">
					{quantity} x ${price}
				</span>
			</ItemDetails>
		</CartItemContainer>
	);
});

export default CartItem;
