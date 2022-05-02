import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSageMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

type ExtPersistConfig = PersistConfig<RootState> & {
	whitelist: (keyof RootState)[];
};

const persistConfig: ExtPersistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const sageMiddleware = createSageMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [sageMiddleware];
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);
sageMiddleware.run(rootSaga);
export const persistor = persistStore(store);
