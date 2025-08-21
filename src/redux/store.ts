import { configureStore } from '@reduxjs/toolkit';
import { type Persistor, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './saga';
import { persistedReducer } from './slices/reducer';

const sagaMiddleware = createSagaMiddleware()


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(sagaMiddleware),
})


export const persistor: Persistor = persistStore(store);

sagaMiddleware.run(rootSaga)


export type RootState = ReturnType<typeof store.getState>;