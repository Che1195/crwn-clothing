import {connect} from "react-redux"
import {compose} from "redux"
import {createStructuredSelector} from "reselect"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import {selectCartItemsCount} from "../../redux/cart/cart.selectors"
import {toggleCartHidden} from "../../redux/cart/cart.actions"

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const CartIconContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(CartIcon)

export default CartIconContainer