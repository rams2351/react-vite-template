import { sagaActions } from "@/redux/saga/sagaActions";
import { userSlice } from "@/redux/slices/userSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { type PersistConfig, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'; // simpler if not SSR

type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user'],
};


const rootReducer = combineReducers({
    user: userSlice.reducer,
});


const actions = {
    ...userSlice.actions,
    ...sagaActions,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export { actions, persistedReducer };
