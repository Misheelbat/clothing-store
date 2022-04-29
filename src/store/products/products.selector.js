import { createSelector } from 'reselect';

const selectProductsReducer = (state) => state.productsMap;

export const selectProducts = createSelector(
	[selectProductsReducer],
	(productsMap) => productsMap.products
);

export const selectProductsMap = createSelector([selectProducts], (products) =>
	products.reduce((acc, productsCategory) => {
		const { title, items } = productsCategory;
		acc[title.toLowerCase()] = items;
		return acc;
	}, {})
);

export const selectIsProductLoading = createSelector(
	[selectProductsReducer],
	(productsMapSlice) => productsMapSlice.isLoading
);
