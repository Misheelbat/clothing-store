import { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import CartIcon from '../../components/cart-icon/CartIcon';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink,
} from './navigation.style';
const Navigation = () => {
	const { currentUser } = useSelector((state) => state.user);
	const { open } = useContext(CartContext);

	const signOutHandler = async () => {
		await signOutUser();
	};
	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<Logo className="logo" />
				</LogoContainer>
				<NavLinks>
					<NavLink to="/shop">SHOP</NavLink>
					{currentUser ? (
						<NavLink as="span" onClick={signOutHandler}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to="/auth">SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{open && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
