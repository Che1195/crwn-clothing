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
* 112. Cart Component
**********************************************************/

// created the card component

import React from "react";
import { connect } from "react-redux";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">0</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
// styled it
// added it to the header component

/*********************************************************
* 113. Cart Dropdown Component
**********************************************************/

// created the card dropdown component

import React from "react";

import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => (
  <div className="cart-dropdown">
    <div className="cart-items" />
    <CustomButton> GO TO CHECKOUT </CustomButton>
  </div>
);

export default CartDropdown;

// styled it
// added it to the header component

/*********************************************************
* 114. Implementing Redux in Cart
**********************************************************/

// create the cart redux folder with the necessary files

// cart.actions.js

import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

// cart.reducer.js

import CartActionTypes from "./cart.types";

const INITIAL_STATE = {
  hidden: true,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    default:
      return state;
  }
};

export default cartReducer;

// cart.types.js

const CartActionTypes = {
  TOGGLE_CART_HIDDEN: "TOGGLE_CART_HIDDEN",
};

export default CartActionTypes;

// bind the action to CartIcon component

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(CartIcon);

// bind the cart reducer to the root reducer

import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});


// more advanced way of destructuring nested properties, shown in the mapStateToProps arrow function

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

export default connect(mapStateToProps)(Header);

// use logic in the header component to toggle the cart dropdown in the UI

{hidden ? null : <CartDropdown />}

// =====================================BOOKMARK=======================================>

/*********************************************************
* 115. Add To Cart Styling
**********************************************************/

// added another conditional class value to the CustomButton component

import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
  <button
    className={`${inverted ? "inverted" : ""} ${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;

// Added the custom button component to the collection item component

<CustomButton inverted> Add To Cart </CustomButton>

/*********************************************************
* 116. Cart Item Reducer
**********************************************************/

// add a items property to the Cart reducer
// add a case for the "ADD_ITEM" type in the Cart reducer module

import CartActionTypes from "./cart.types";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    default:
      return state;
  }
};

export default CartReducer;


// create the action for adding an item to the cart

// types.js
const CartActionTypes = {
  TOGGLE_CART_HIDDEN: "TOGGLE_CART_HIDDEN",
  ADD_ITEM: "ADD_ITEM",
};

export default CartActionTypes;

// actions.js
import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

// change the prop arguments for CollectionPreview so that we will have 
// access to the item to be able to add it to the state

import React from "react";
import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collection-item.component";

export const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

// modify the collection item component so that clicking on the add 
// to cart button adds that item to the cart items state property

import React from "react";
import { connect } from "react-redux";

import { addItem } from "../../redux/cart/cart.actions";
import CustomButton from "../custom-button/custom-button.component";

import "./collection-item.styles.scss";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{`$${price}`}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        {" "}
        Add To Cart{" "}
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);

/*********************************************************
* 117. Adding Multiple Items To Cart
**********************************************************/

// cart.utils.js - for utility functions related to the reducer code of the state

export const addItemToCart = (cartItems, cartItemToAdd) => {
  // look for the first item already in the cart that matches the item to add
  const cartItemMatched = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  // if the item matched then for every matching cart item, add 1 to that cart items
  // quantity value, else return a
  if (cartItemMatched) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // if there was no matching cart item we will return the list of cartItems
  // with the item to add attached to the end and given a quanitity value
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

// use the function from cart.utils.js in the reducer

import CartActionTypes from "./cart.types"; 
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [], // must initialize the cartItems as an empty array
};

const CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload), // this value must be an array
      };
    default:
      return state;
  }
};

export default CartReducer;











