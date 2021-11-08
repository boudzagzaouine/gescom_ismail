import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counterReducer from 'features/counter/counterSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

export function makeStore() {
  //   return configureStore({
  //     reducer: { counter: counterReducer },
  //   });
  const rootReducer = combineReducers({
    counter: counterReducer
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  return store;
}

const store = makeStore();
export const persistor = persistStore(store)

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;