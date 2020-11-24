import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import CartIconContainer from "../cart-icon/cart-icon.container";
import CartDropdownContainer  from "../../components/cart-dropdown/cart-dropdown.container"
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from "./header.styles"

import {signOutStart} from "../../redux/user/user.actions"

const Header = ({ currentUser, hidden, signOut }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>

    <OptionsContainer>
      <OptionLink to="/shop">
        SHOP
      </OptionLink>
      <OptionLink to="">
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={signOut}>
          SIGN OUT:{" "}
          {currentUser.displayName
            ? currentUser.displayName.split(" ")[0].toUpperCase()
            : currentUser.displayName}
        </OptionLink>
      ) : (
        <OptionLink to="/signin">
          SIGN IN
        </OptionLink>
      )}
      <CartIconContainer />
      {hidden ? null : <CartDropdownContainer />}
    </OptionsContainer>
  </HeaderContainer>
);

// description of syntax:
// 1. an arrow function expression, arg state, returns object, state.user.currentUser key currentUser

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
