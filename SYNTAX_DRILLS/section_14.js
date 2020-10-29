/*********************************************************
 * 155. Deploying to Heroku
 **********************************************************/

// create a Heroku account
// install the Heroku CLI
// create a Heroku project using this command
// heroku create crwn-live-che --buildpack https://github.com/mars/create-react-app-buildpack.git
// this will return a link to the hosted project

// the domain needs to be given permission to use firebase sign in functionality

/*********************************************************
 * 157. Linking Github to Heroku
 **********************************************************/

 // want to update your live app everytime you update your master git branch?
 // follow the steps in this link: https://devcenter.heroku.com/articles/github-integration

 /*********************************************************
 * 159. Optimizing Production Build
 **********************************************************/

 // we dont want the logger to be leaving messages in the console

 import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [];

// We want to apply the logger middleware only if the NODE_ENV is in development
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default store;
