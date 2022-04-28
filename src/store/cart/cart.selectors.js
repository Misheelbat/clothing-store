import { createSelector } from 'reselect';

const countCartItemQuantity = (cartItems) => {
	const quantity = cartItems.reduce((acc, items) => acc + items.quantity, 0);
	return quantity;
};

const countCartTotalPrice = (cartItems) => {
	const totalPrice = cartItems.reduce(
		(acc, items) => acc + items.quantity * items.price,
		0
	);
	return totalPrice;
};

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
	[selectCartReducer],
	(cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
	[selectCartReducer],
	(cart) => cart.open
);

export const selectCartCount = createSelector([selectCartItems], (cartItem) =>
	countCartItemQuantity(cartItem)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItem) =>
	countCartTotalPrice(cartItem)
);
