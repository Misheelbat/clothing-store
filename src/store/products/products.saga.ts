import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchProductsSuccess, fetchProductsFailed } from './products.actions';
import { PRODUCTS_ACTIONS } from './products.type';

export function* fetchProductsAsync() {
	try {
		const categoriesArray = yield* call(getCategoriesAndDocuments);
		yield* put(fetchProductsSuccess(categoriesArray));
	} catch (error) {
		yield* put(fetchProductsFailed(error as Error));
	}
}

export function* onFetchProducts() {
	yield* takeLatest(PRODUCTS_ACTIONS.FETCH_PRODUCT_START, fetchProductsAsync);
}

export function* productsSaga() {
	yield* all([call(onFetchProducts)]);
}
