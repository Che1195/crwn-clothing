/*********************************************************
 * 136. Local Storage and Session Storage
 **********************************************************/

// data can be stored locally using...
window.localStorage.setItem(keyName, JSON.stringify(objectToSave));

// data can be retrieved from local storage using...
window.localStorage.getItem(keyName);
// the return of this method can be stored and parsed back into normal JSON code with
JSON.parse(itemToParse);

/*********************************************************
 * 137. Redux Persist
 **********************************************************/

// install redux-persist
/* make some modifications to some files that we have already coded*/

// create a new persisted version of the store using the persistStore() function
//to the store.js redux file

import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };

// update root-reducer.js

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import CartReducer from "./cart/cart.reducer";
import UserReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: UserReducer,
  cart: CartReducer,
});

export default persistReducer(persistConfig, rootReducer);

// update index.js

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
