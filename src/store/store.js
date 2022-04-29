import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import createSageMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const sageMiddleware = createSageMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger, sageMiddleware];
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);
sageMiddleware.run(rootSaga);
export const persistor = persistStore(store);
