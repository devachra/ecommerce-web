import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { logger } from "redux-logger";

import { rootReducer } from "./root.reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type :", action.type);
  console.log("payload :", action.payload);
  console.log("getState :", store.getState());

  next(action);
  console.log("next State :", store.getState());
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlerWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlerWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
