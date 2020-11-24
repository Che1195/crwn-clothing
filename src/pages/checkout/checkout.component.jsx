import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItemContainer from "../../components/checkout-item/checkout-item.container";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component"

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import { CheckoutHeaderContainer, CheckoutPageContainer, HeaderBlockContainer, TotalContainer, TestWarningContainer } from "./checkout.styles"

const CheckoutPage = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Product</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Description</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Quantity</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Price</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Remove</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    {cartItems.map((cartItem) => (
      <CheckoutItemContainer key={cartItem.id} cartItem={cartItem} />
    ))}
    <TotalContainer> TOTAL: ${total} </TotalContainer>
    <TestWarningContainer>
      *Please use the following test credit cart for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
    </TestWarningContainer>
    <StripeCheckoutButton price={total}/>
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
