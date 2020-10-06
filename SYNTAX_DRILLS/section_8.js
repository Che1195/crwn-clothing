// user.actions.js

export const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});

// user.reducer.js

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

// root-reducer.js

import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";

export default combineReducers({
  user: userReducer,
});

//  store.js
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";
import { connect } from "react-redux";

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;

// App.js lifecycle methods

unsubscribeFromAuth = null;

componentDidMount() {
  const { setCurrentUser } = this.props;

  this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot((snapShot) => {
        setCurrentUser({
          id: snapShot.id,
          ...snapShot.data(),
        });
      });
    }

    setCurrentUser(userAuth);
  });
}

componentWillUnmount() {
  this.unsubscribeFromAuth();
}

// mapDispatchToProps

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);

// mapStateToProps
// description of syntax:
// 1. an arrow function expression, arg state, returns object, state.user.currentUser key currentUser

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(Header)

/*********************************************************
* 111. User Redirect and User Action Type
**********************************************************/

// User Redirect: When a user successfully logs in, they get redirected to the home page

import { Route, Switch, Redirect } from "react-router-dom";

<Route
exact
path="/signin"
render={() =>
  this.props.currentUser ? (
    <Redirect to="/" />
  ) : (
    <SignInAndSignUpPage />
  )
}
/>

// User Action Type: DRY for action types

export const userActionTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

/*********************************************************
* 111. User Redirect and User Action Type
**********************************************************/