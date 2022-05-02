import { createSelector } from 'reselect';
import { ProductsState } from './products.reducer';
import { ProductMap } from './products.type';
import { RootState } from '../store';

const selectProductsReducer = (state: RootState): ProductsState =>
	state.productsMap;

export const selectProducts = createSelector(
	[selectProductsReducer],
	(productsMap) => productsMap.products
);

export const selectProductsMap = createSelector(
	[selectProducts],
	(products): ProductMap =>
		products.reduce((acc, productsCategory) => {
			const { title, items } = productsCategory;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {} as ProductMap)
);

export const selectIsProductLoading = createSelector(
	[selectProductsReducer],
	(productsMapSlice) => productsMapSlice.isLoading
);
