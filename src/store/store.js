import { createStore, compose, applyMiddleware } from "redux";
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
const middlerWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlerWares));

export const sotre = createStore(rootReducer, undefined, composedEnhancers);
