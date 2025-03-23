
import React, { createContext, useContext, useState, useEffect } from "react";
import { ListingProps } from "@/components/ListingCard";
import { useToast } from "@/components/ui/use-toast";

type CartItem = {
  item: ListingProps;
  quantity: number;
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: ListingProps) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart data:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: ListingProps) => {
    setCartItems((prevItems) => {
      // Check if item is already in cart
      const itemIndex = prevItems.findIndex((cartItem) => cartItem.item.id === item.id);
      
      if (itemIndex > -1) {
        // Item exists, increment quantity
        const newItems = [...prevItems];
        newItems[itemIndex].quantity += 1;
        
        toast({
          title: "Quantity updated",
          description: `${item.title} quantity increased to ${newItems[itemIndex].quantity}`,
        });
        
        return newItems;
      } else {
        // Item doesn't exist, add new item
        toast({
          title: "Added to cart",
          description: `${item.title} has been added to your cart`,
        });
        
        return [...prevItems, { item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.item.id !== itemId);
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
      
      return newItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
