import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assest/shopping-bag.svg";
import { setIsCartOpen } from "../../store/cart/cart.acton";

import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import "./cart-icon.style.scss";

const CartIcon = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();
  // const totalQuantity = cartItems
  //   .map((item) => item.quantity)
  //   .reduce((a, b) => a + b, 0);

  const toggleCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <div className="cart-icon-container" onClick={toggleCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
