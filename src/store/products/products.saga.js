import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchProductsSuccess, fetchProductsFailed } from './products.actions';
import { PRODUCTS_ACTIONS } from './products.type';

export function* fetchProductsAsync() {
	try {
		const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
		yield put(fetchProductsSuccess(categoriesArray));
	} catch (error) {
		yield put(fetchProductsFailed(error));
	}
}

export function* onFetchProducts() {
	yield takeLatest(PRODUCTS_ACTIONS.FETCH_PRODUCT_START, fetchProductsAsync);
}

export function* productsSaga() {
	yield all([call(onFetchProducts)]);
}
