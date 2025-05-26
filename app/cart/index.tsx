"use client";
import React from "react";
import { useCartStore } from "../store";

const CartPage = () => {
  const { cart, addToCart, updateQuantity } = useCartStore();
  console.log("cart", cart);

  return <div>this is cart page</div>;
};

export default CartPage;
