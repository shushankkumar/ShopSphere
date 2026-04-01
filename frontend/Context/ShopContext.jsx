import React, { createContext, useEffect, useState } from 'react';
//import all_product from "../src/assets/all_product";

export const ShopContext = createContext(null);

const CART_STORAGE_KEY = 'shop-cart-items';
const AUTH_TOKEN_KEY = 'auth-token';

const getDefaultcart = () => {
  return {};
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultcart());

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetch('http://localhost:4000/product/allproducts')
      .then((response) => response.json())
      .then((data) => setAllProduct(data))
      .catch((error) => {
        console.error('Failed to fetch products:', error);
      });
  }, []);

  useEffect(() => {
    const syncCartWithAuth = () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (!token) {
        setCartItems(getDefaultcart());
        localStorage.removeItem(CART_STORAGE_KEY);
        return;
      }

      fetch('http://localhost:4000/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': token,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch cart');
          }
          return response.json();
        })
        .then((data) => {
          setCartItems(data || getDefaultcart());
        })
        .catch((error) => {
          console.error('Failed to fetch cart data:', error);
          setCartItems(getDefaultcart());
        });
    };

    syncCartWithAuth();

    window.addEventListener('auth-change', syncCartWithAuth);
    window.addEventListener('storage', syncCartWithAuth);

    return () => {
      window.removeEventListener('auth-change', syncCartWithAuth);
      window.removeEventListener('storage', syncCartWithAuth);
    };
  }, []);

  const addToCart = (itemId, size) => {
    if (!size) {
      return;
    }

    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!token) {
      alert('Please login first to add items to cart.');
      return;
    }

    fetch('http://localhost:4000/addtocart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'auth-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, size }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        return response.json();
      })
      .then((data) => {
        setCartItems(data.cartData || getDefaultcart());
      })
      .catch((error) => {
        console.error('Failed to sync cart with server:', error);
      });
  }

  const removeFromCart = (itemId, size) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!token) {
      setCartItems(getDefaultcart());
      return;
    }

    fetch('http://localhost:4000/removefromcart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'auth-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, size }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to remove item from cart');
        }
        return response.json();
      })
      .then((data) => {
        setCartItems(data.cartData || getDefaultcart());
      })
      .catch((error) => {
        console.error('Failed to sync cart removal with server:', error);
      });
  }

  const clearCart = () => {
    setCartItems(getDefaultcart())
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  const getTotalCartAmount = () => {
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

  const getTotalCartItems = () => {
    let totalItem = 0;

    for (const itemId in cartItems) {
      const sizeMap = cartItems[itemId];

      for (const size in sizeMap) {
        totalItem += sizeMap[size];
      }
    }

    return totalItem
  }

  const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, clearCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
