import type { Cart } from '@commercetools/platform-sdk';

const state = $state({
	cartSet: false,
	cart: undefined as Cart | undefined
});

export const getCartState = () => {
	return state;
};

export const setCart = (cart: Cart | undefined) => {
	state.cartSet = true;
	state.cart = cart;
};
