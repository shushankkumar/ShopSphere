import React, { createContext, useEffect, useState } from 'react';
import all_product from "../src/assets/all_product";

export const ShopContext = createContext(null);

const CART_STORAGE_KEY = "shopsphere_cart";

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return {};
    const parsedCart = JSON.parse(savedCart);
    if (!parsedCart || typeof parsedCart !== "object") return {};

    const normalizedCart = {};
    Object.entries(parsedCart).forEach(([key, value]) => {
      const quantity = Number(value) || 0;
      if (quantity <= 0) return;

      if (key.includes("-")) {
        normalizedCart[key] = quantity;
      } else {
        normalizedCart[`${key}-M`] = (normalizedCart[`${key}-M`] || 0) + quantity;
      }
    });

    return normalizedCart;
  } catch {
    return {};
  }
};

const ShopContextProvider = (props) =>{

        const [cartItems,setCartItems] = useState(getInitialCart());

        useEffect(() => {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        }, [cartItems]);

        const addToCart = (itemId, size = "M") =>{
            const cartKey = `${itemId}-${size}`;
            setCartItems((prev)=>({...prev,[cartKey]:(prev[cartKey] || 0)+1}));
        }

        const removeFromCart = (itemId, size = "M") =>{
            const cartKey = `${itemId}-${size}`;
            setCartItems((prev)=>{
                const nextValue = (prev[cartKey] || 0) - 1;
                if (nextValue <= 0) {
                    const updatedCart = { ...prev };
                    delete updatedCart[cartKey];
                    return updatedCart;
                }
                return { ...prev, [cartKey]: nextValue };
            });
        }

        const getTotalCartAmount = ()=>{
            let totalAmount = 0;
            for(const cartKey in cartItems)
            {
                if(cartItems[cartKey]>0)
                {
                    const [itemId] = cartKey.split("-");
                    let itemInfo = all_product.find((product)=>product.id===Number(itemId));
                    if (itemInfo) {
                        totalAmount +=  cartItems[cartKey]*itemInfo.new_price;
                    }
                }
            }
            return totalAmount
        }

        const getTotalCartItems = ()=>{
            let totalItem=0;
            for(const cartKey in cartItems)
            {
                if(cartItems[cartKey]>0)
                {
                    totalItem += cartItems[cartKey];
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
