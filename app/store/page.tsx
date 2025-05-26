// "use client";
// import { createContext, useContext, useState, ReactNode } from "react";
// import { Product } from "../types/index";

// interface CartContextType {
//   cart: Product[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   cartCount: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<Product[]>([]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };
//  const removeFromCart = (productId: number) => {
//    setCart((prevCart) => {
//      const index = prevCart.findIndex((product) => product.id === productId);
//      if (index !== -1) {
//        const updatedCart = [...prevCart];
//        updatedCart.splice(index, 1);
//        return updatedCart;
//      }
//      return prevCart;
//    });
//  };
//   const cartCount = cart.length;
//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, cartCount }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
