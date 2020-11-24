import React from "react";

import {CartIconContainer, ShoppingIconContainer, ItemCountContainer} from "./cart-icon.styles"

const CartIcon = ({ itemCount, toggleCartHidden }) => (
  <CartIconContainer onClick={toggleCartHidden}>
    <ShoppingIconContainer/>
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartIconContainer>
);

export default CartIcon
