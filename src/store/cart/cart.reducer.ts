import { AnyAction } from 'redux';
import { CartItem } from './cart.types';
import { setOpen, setCartItems } from './cart.actions';

export type CartState = {
	readonly cartItems: CartItem[];
	readonly open: boolean;
};
const CART_INITIAL_STATE: CartState = {
	cartItems: [],
	open: false,
};

export const cartReducer = (
	state = CART_INITIAL_STATE,
	actions: AnyAction
): CartState => {
	if (setOpen.match(actions)) {
		return { ...state, open: actions.payload };
	}

	if (setCartItems.match(actions)) {
		return { ...state, cartItems: actions.payload };
	}
	
	return state;
};
