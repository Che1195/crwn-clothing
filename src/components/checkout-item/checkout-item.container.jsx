import {connect} from "react-redux"
import {compose} from "redux"
import CheckoutItem from "../../components/checkout-item/checkout-item.component"

import {
  clearItemFromCart,
  addItem,
  removeItem
} from "../../redux/cart/cart.actions"

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
})

const CheckoutItemContainer = compose(
  connect(null, mapDispatchToProps)
)(CheckoutItem)

export default CheckoutItemContainer

 