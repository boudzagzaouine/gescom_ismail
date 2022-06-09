import { createOffline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import {
  Action,
  combineReducers, configureStore, StoreEnhancer, ThunkAction
} from "@reduxjs/toolkit";
import counterReducer from "features/counter/counterSlice";
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, persistStore, PURGE,
  REGISTER, REHYDRATE
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import customOfflineConfig from "./offline";
import { crudAdressLiv } from "./rtk/RtkAdressLiv";
import { crudArticle } from "./rtk/rtkArticle";
import { crudArticleClient } from "./rtk/RtkArticleClient";
import { crudArticleCommande } from "./rtk/RtkArticleCommande";
import { crudArticleFacture } from './rtk/rtkArticleFacture';
import { crudAvoir } from './rtk/rtkAvoir';
import { crudBureauDouane } from "./rtk/rtkBureauDouane";
import { crudClient } from "./rtk/RtkClient";
import { crudCommande } from "./rtk/RtkCommande";
import { crudDeclarant } from "./rtk/rtkDeclarant";
import { crudDevise } from "./rtk/rtkDevise";
import { crudDocument } from "./rtk/rtkDocument";
import { crudFacture } from './rtk/rtkFacture';
import { crudFournisseur } from "./rtk/rtkFournisseur";
import { crudIncoterm } from "./rtk/rtkIncoterm";
import { crudPayementMode } from "./rtk/rtkPayementMode";
import { crudPays } from "./rtk/rtkPays";
import { crudRawMaterial } from "./rtk/rtkRawMaterial";
import { crudRegimeDouanier } from "./rtk/rtkRegimeDouanier";
import { crudRole } from "./rtk/rtkRole";
import { crudTransporteur } from "./rtk/rtkTransporteur";
import { crudType } from "./rtk/rtkType";
import { crudUnitMeasure } from "./rtk/rtkUnitMeasure";
import { crudUser } from "./rtk/RtkUser";
import { crudVille } from "./rtk/rtkVille";




const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore,
} = createOffline({
  ...offlineConfig,
  persist: undefined,
  ...customOfflineConfig,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

export function makeStore() {
  const rootReducer = combineReducers({
    counter: counterReducer,
    [crudUser.reducerPath]: crudUser.reducer,
    [crudFournisseur.reducerPath]: crudFournisseur.reducer,
    [crudVille.reducerPath]: crudVille.reducer,
    [crudType.reducerPath]: crudType.reducer,
    [crudTransporteur.reducerPath]: crudTransporteur.reducer,
    [crudRole.reducerPath]: crudRole.reducer,
    [crudFacture.reducerPath]: crudFacture.reducer,
    [crudPays.reducerPath]: crudPays.reducer,
    [crudDocument.reducerPath]: crudDocument.reducer,
    [crudDevise.reducerPath]: crudDevise.reducer,
    [crudCommande.reducerPath]: crudCommande.reducer,
    [crudBureauDouane.reducerPath]: crudBureauDouane.reducer,
    [crudArticle.reducerPath]: crudArticle.reducer,
    [crudRegimeDouanier.reducerPath]: crudRegimeDouanier.reducer,
    [crudRawMaterial.reducerPath]: crudRawMaterial.reducer,
    [crudDeclarant.reducerPath]: crudDeclarant.reducer,
    [crudIncoterm.reducerPath]: crudIncoterm.reducer,
    [crudPayementMode.reducerPath]: crudPayementMode.reducer,
    [crudUnitMeasure.reducerPath]: crudUnitMeasure.reducer,
    [crudClient.reducerPath]: crudClient.reducer,
    [crudAdressLiv.reducerPath]: crudAdressLiv.reducer,
    [crudArticleCommande.reducerPath]: crudArticleCommande.reducer,
    [crudArticleClient.reducerPath]: crudArticleClient.reducer,
    [crudArticleFacture.reducerPath]: crudArticleFacture.reducer,
    [crudAvoir.reducerPath]: crudAvoir.reducer,
  });
  const persistedReducer = persistReducer(
    persistConfig,
    offlineEnhanceReducer(rootReducer)
  );
  const store = configureStore({
    reducer: persistedReducer,
    enhancers: [offlineEnhanceStore as StoreEnhancer],
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat([crudUser.middleware, offlineMiddleware])
        .concat([crudVille.middleware, offlineMiddleware])
        .concat([crudType.middleware, offlineMiddleware])
        .concat([crudFournisseur.middleware, offlineMiddleware])
        .concat([crudTransporteur.middleware, offlineMiddleware])
        .concat([crudRole.middleware, offlineMiddleware])
        .concat([crudPays.middleware, offlineMiddleware])
        .concat([crudDocument.middleware, offlineMiddleware])
        .concat([crudDevise.middleware, offlineMiddleware])
        .concat([crudDevise.middleware, offlineMiddleware])
        .concat([crudFacture.middleware, offlineMiddleware])
        .concat([crudBureauDouane.middleware, offlineMiddleware])
        .concat([crudArticle.middleware, offlineMiddleware])
        .concat([crudRegimeDouanier.middleware, offlineMiddleware])
        .concat([crudRawMaterial.middleware, offlineMiddleware])
        .concat([crudDeclarant.middleware, offlineMiddleware])
        .concat([crudIncoterm.middleware, offlineMiddleware])
        .concat([crudPayementMode.middleware, offlineMiddleware])
        .concat([crudUnitMeasure.middleware, offlineMiddleware])
        .concat([crudClient.middleware, offlineMiddleware])
        .concat([crudAdressLiv.middleware, offlineMiddleware])
        .concat([crudArticleCommande.middleware, offlineMiddleware])
        .concat([crudArticleClient.middleware, offlineMiddleware])
        .concat([crudArticleFacture.middleware, offlineMiddleware])
        .concat([crudAvoir.middleware, offlineMiddleware])
    ,
  });
  return store;
}

const store = makeStore();
export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
