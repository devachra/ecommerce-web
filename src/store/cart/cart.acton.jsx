import { createActions } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE } from "./cart.type";

export const setIsCartOpen = (boolean) =>
  createActions(CART_ACTION_TYPE.CART_IS_CART_OPEN, boolean);

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

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItem = addCartItem(cartItems, productToAdd);
  return createActions(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItem);
};
export const removeItemFromCart = (cartItems, itemToRemove) => {
  const newCartItem = removeCartItem(cartItems, itemToRemove);
  return createActions(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItem);
};
export const deleteItemFromCart = (cartItems, itemToRemove) => {
  const newCartItem = deleteCartItem(cartItems, itemToRemove);
  return createActions(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItem);
};
