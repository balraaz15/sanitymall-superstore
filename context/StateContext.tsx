import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import ProductData from "../types/Product";

const SanityContext = createContext({});

export const StateContext = ({ children }: any) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<ProductData[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: any;
  let index;

  const checkInCart = (product: ProductData) => {
    const cartCheck: any = cartItems?.find(
      (item: ProductData) => item?._id === product?._id
    );
    if (cartCheck) return true;
    return false;
  };

  const addToCart = (product: any, quantity: number) => {
    if (checkInCart(product) === true) return;

    setTotalPrice((total) => total + product?.price * quantity);
    setTotalQuantities((prevQty) => prevQty + quantity);

    setCartItems([...cartItems, { ...product, quantity }]);
    toast.success(`${quantity} ${product.name} successfully added to cart`);
  };

  const removeFromCart = (product: any) => {
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setCartItems(newCartItems);

    setTotalPrice((prevPrice) => prevPrice - product.price * product.quantity);
    setTotalQuantities((prevQty) => prevQty - product.quantity);
  };

  const toggleCartItemQty = (id: string, value: string) => {
    foundProduct = cartItems?.find((item: ProductData) => item?._id === id);
    index = cartItems.findIndex((product) => product?._id === id);

    if (value === "inc") {
      foundProduct.quantity += 1;
      cartItems[index] = foundProduct;

      setTotalPrice((prevPrice) => prevPrice + foundProduct.price);
      setTotalQuantities((prevQty) => prevQty + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity -= 1;
        cartItems[index] = foundProduct;

        setTotalPrice((prevPrice) => prevPrice - foundProduct.price);
        setTotalQuantities((prevQty) => prevQty - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <SanityContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        checkInCart,
        addToCart,
        toggleCartItemQty,
        removeFromCart,
      }}
    >
      {children}
    </SanityContext.Provider>
  );
};

export const useStateContext = () => useContext(SanityContext);
