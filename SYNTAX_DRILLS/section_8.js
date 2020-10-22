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

// ==================================================================================>
// ===================================BOOKMARK=======================================>
// ==================================================================================>

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

/*********************************************************
* 119. Cart Item Component
**********************************************************/

// build the CartItem component

import React from "react";
import "./cart-item.styles.scss";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <div className="cart-item">
    <img src={imageUrl} alt="item" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">{quantity} x ${price}</span>
    </div>
  </div>
);

export default CartItem;

// add the cartItem components to the cart Dropdown component

import React from "react";
import { connect } from "react-redux";

import CartItem from "../../components/cart-item/cart-item.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
    <CustomButton> GO TO CHECKOUT </CustomButton>
  </div>
);

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});

export default connect(mapStateToProps)(CartDropdown);

/*********************************************************
* 121. Selectors in Redux
**********************************************************/

// adding a itemCount indicator in the cartIcon component
// this is the inefficient way of doing this, selectors are better
// DONT DRILL THIS!! WASTE OF TIME!!

import React from "react";
import { connect } from "react-redux";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = ({ cart: { cartItems } }) => ({
  itemCount: cartItems.reduce((acc, cur) => acc + cur.quantity, 0),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

/*********************************************************
* 123. Reselect Library
**********************************************************/

// cart.selectors.js

import { createSelector } from "reselect";

const selectCart = (state) => state.cart; // input selector

// memoized selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);


// updating cartItemsCount using memoization by way of selectors
import React from "react";
import { connect } from "react-redux";

import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

/*********************************************************
* 125. User Selectors
**********************************************************/

// create the user selectors

import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

// create a new selector for the cart hidden property

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// replace the components we have the respective selectors
// using the createStructuredSelector function
// this gets repeated for all of the components using mapstatetoprops

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

/*********************************************************
* 126. Checkout Page
**********************************************************/

// create a message that appears in the cart dropdown menu when the cart is empty

const CartDropdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton> Go To Checkout </CustomButton>
  </div>
);

// center the empty cart message

// create the checkout page folder and files

import React from "react";

import "./checkout.styles.scss";

const CheckoutPage = () => (
  <div className="checkout-page">Welcome to the checkout page.</div>
);

export default CheckoutPage;

// add a <Route> component pointing to the page in the switch component in App.js

<Route exact path="/checkout" component={CheckoutPage} />

// wrap the connect()() function in the withRouter function giving us access to
// the history prop which we can then use to access the checkout page onClick

const CartDropdown = ({ cartItems, history }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton onClick={() => history.push("/checkout")}>
      {" "}
      Go To Checkout{" "}
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));

/*********************************************************
* 127. Checkout Page 2
**********************************************************/

// now we have to build a rough draft of our checkout page

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/checkout-item.component"

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import "./checkout.styles.scss";

const CheckoutPage = ({ cartItems, cartTotal }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">
      <span> TOTAL: ${cartTotal}</span>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);

/*********************************************************
* 128. Extensible Code
**********************************************************/

// quick lesson on the importance of keeping code simple 
// and coding for future ease of use

/*********************************************************
* 129. Dispatch action shorthand
**********************************************************/

// make it so that the cart dropdown hides when you click on the go to checkout button
// introducring a less verbose way of using an action dispatch

const CartDropdown = ({ cartItems, history, dispatch }) => ( // dispatch is an included prop
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden()); // call toggleCartHidden action when the button is clicked
      }}
    >
      {" "}
      Go To Checkout{" "}
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));

/*********************************************************
* 130. Checkout Item Component
**********************************************************/

// create the checkout item Component

import React from "react";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem: { imageUrl, name, quantity, price } }) => (
  <div className="checkout-item">
    <div className="image-container">
      <img src={imageUrl} alt="item" />
    </div>
    <span className="name">{name}</span>
    <span className="quantity">{quantity}</span>
    <span className="price">{price}</span>
    <div className="remove-button">&#10005;</div>
  </div>
);

export default CheckoutItem;

// add the component to the map method in the checkout page

{cartItems.map((cartItem) => (
  <CheckoutItem key={cartItem.id} cartItem={cartItem} />
))}

/*********************************************************
* 131. Remove Items From Cart
**********************************************************/

// create a new cart action type for clearing an item from the cart

const CartActionTypes = {
  TOGGLE_CART_HIDDEN: "TOGGLE_CART_HIDDEN",
  ADD_ITEM: "ADD_ITEM",
  CLEAR_ITEM_FROM_CART: "CLEAR_ITEM_FROM_CART"
};

export default CartActionTypes;

// create a new action that dispatches the clear item from cart

export const clearItemFromCart = (item) => ({
  type: cartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

// update reducer with a new case for clearing an item from the cart

case cartActionTypes.CLEAR_ITEM_FROM_CART:
  return {
    ...state,
    cartItems: state.cartItems.filter(
      (cartItem) => cartItem.id !== action.payload.id
    ),
  };

// bind the clear item from cart functionality to our checkout-item component

import React from "react";
import { connect } from "react-redux";
import "./checkout-item.styles.scss";

import { clearItemFromCart } from "../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem, clearItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">{quantity}</span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);

/*********************************************************
* 132. Remove Items at Checkout
**********************************************************/

/* building in our quantity increase and decrease feature */

// add the increase and decrease quanitity arrows to our UI

<span className="quantity">
  <div className="arrow">&#10094;</div>
  <span className="value">{quantity}</span>
  <div className="arrow">&#10095;</div>
</span>

// create the functionality for the decrease and increase arrows

// add the remove item type

const CartActionTypes = {
  TOGGLE_CART_HIDDEN: "TOGGLE_CART_HIDDEN",
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_ITEM_FROM_CART: "CLEAR_ITEM_FROM_CART",
};

export default CartActionTypes;

// create the remove item action

export const removeItem = (item) => ({
  type: cartActionTypes.REMOVE_ITEM,
  payload: item,
});

// modify the reducer to have a case for the remove item action

case cartActionTypes.REMOVE_ITEM:
  return {
    ...state,
    cartItems: removeItemFromCart(state.cartItems, action.payload),
  };

// Write a new utility function that returns a new array with the subtracted item

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  
  // check if the quantity of the item to be removed is equal to 1
  // if so, return a new array that filters out that cartItem
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return a new array that subtracts 1 from the quantity of the relavent cart item
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// add the functionality to the checkout-item component

import React from "react";
import { connect } from "react-redux";
import "./checkout-item.styles.scss";

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";


const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);

// ==================================================================================>
// ===================================BOOKMARK=======================================>
// ==================================================================================>
