import React,{ createContext, useEffect, useState } from 'react';
import all_product from "../src/assets/all_product";

export const ShopContext = createContext(null); 

const CART_STORAGE_KEY = 'shop-cart-items';

const getDefaultcart = () => {
  return {};
};

const ShopContextProvider = (props) =>{
  const [cartItems,setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return getDefaultcart();
    }

    try {
      return JSON.parse(savedCart);
    } catch (error) {
      console.error('Failed to parse cart data:', error);
      return getDefaultcart();
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId, size) =>{
    if (!size) {
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [size]: (prev[itemId]?.[size] || 0) + 1,
      },
    }));
  }

  const removeFromCart = (itemId, size) =>{
    setCartItems((prev) => {
      const currentItem = prev[itemId] || {};
      const currentQuantity = currentItem[size] || 0;

      if (currentQuantity <= 1) {
        const updatedSizes = { ...currentItem };
        delete updatedSizes[size];

        if (Object.keys(updatedSizes).length === 0) {
          const updatedCart = { ...prev };
          delete updatedCart[itemId];
          return updatedCart;
        }

        return {
          ...prev,
          [itemId]: updatedSizes,
        };
      }

      return {
        ...prev,
        [itemId]: {
          ...currentItem,
          [size]: currentQuantity - 1,
        },
      };
    });
  }

  const getTotalCartAmount = ()=>{
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = all_product.find((product) => product.id === Number(itemId));
      const sizeMap = cartItems[itemId];

      if (!itemInfo || !sizeMap) {
        continue;
      }

      for (const size in sizeMap) {
        totalAmount += sizeMap[size] * itemInfo.new_price;
      }
    }

    return totalAmount
  }

  const getTotalCartItems = ()=>{
    let totalItem=0;

    for (const itemId in cartItems) {
      const sizeMap = cartItems[itemId];

      for (const size in sizeMap) {
        totalItem += sizeMap[size];
      }
    }

    return totalItem
  }

  const contextValue = { getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

  return (
    <ShopContext.Provider value={contextValue}> 
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
