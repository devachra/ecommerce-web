import { useReducer } from "react";

import { createContext } from "react";
import { createActions } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItem contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return new array with modified cartItem/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems, itemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCartItem = (cartItems, itemToRemove) => {
  // delete the cart item
  return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
  deleteItemFromCart: () => {},
});
export const CART_ACTION_TYPE = {
  SET_CURRENT_CART: "SET_CURRENT_CART",
  CART_IS_CART_OPEN: "CART_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPE.SET_CURRENT_CART: {
      return { ...state, ...payload };
    }
    case CART_ACTION_TYPE.CART_IS_CART_OPEN: {
      return { ...state, isCartOpen: payload };
    }
    default:
      throw new Error(`unhandle type of ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
  isCartOpen: false,
};
export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);

  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemtoCart = (newCartItem) => {
    const newCartCount = newCartItem.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItem.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    dispatch(
      createActions(CART_ACTION_TYPE.SET_CURRENT_CART, {
        cartItems: newCartItem,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const setIsCartOpen = (bool) =>
    dispatch(createActions(CART_ACTION_TYPE.CART_IS_CART_OPEN, bool));

  const addItemToCart = (productToAdd) => {
    const newCartItem = addCartItem(cartItems, productToAdd);
    updateCartItemtoCart(newCartItem);
  };
  const removeItemFromCart = (itemToRemove) => {
    const newCartItem = removeCartItem(cartItems, itemToRemove);
    updateCartItemtoCart(newCartItem);
  };
  const deleteItemFromCart = (itemToRemove) => {
    const newCartItem = deleteCartItem(cartItems, itemToRemove);
    updateCartItemtoCart(newCartItem);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    cartTotal,
    removeItemFromCart,
    deleteItemFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
