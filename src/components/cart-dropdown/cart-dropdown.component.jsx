import React from "react";

import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { CartDropdownButton, CartDropdownStyleContainer, CartItemsContainer, EmptyMessageContainer } from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownStyleContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageContainer>Your Cart Is Empty</EmptyMessageContainer>
      )}
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      {" "}
      Go To Checkout{" "}
    </CartDropdownButton>
  </CartDropdownStyleContainer>
);

export default CartDropdown
