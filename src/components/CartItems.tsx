
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const CartItems = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-snaplend-100 flex items-center justify-center">
          <ShoppingCart size={24} className="text-snaplend-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
        <p className="text-snaplend-500 mb-6 max-w-xs">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link to="/explore">
          <Button>Browse Items</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 pr-4 -mr-4">
        <div className="space-y-4">
          {cartItems.map((cartItem) => (
            <div key={cartItem.item.id} className="flex gap-4">
              <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                <img 
                  src={cartItem.item.image} 
                  alt={cartItem.item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <Link to={`/item/${cartItem.item.id}`} className="font-medium line-clamp-2 hover:underline">
                  {cartItem.item.title}
                </Link>
                
                <div className="text-primary font-medium mt-1">
                  ₹{cartItem.item.price} / {cartItem.item.priceUnit}
                </div>
                
                <div className="flex items-center mt-2 justify-between">
                  <div className="flex items-center border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                      disabled={cartItem.quantity <= 1}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="w-8 text-center">{cartItem.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-snaplend-500 hover:text-red-500"
                    onClick={() => removeFromCart(cartItem.item.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="mt-auto pt-4">
        <Separator className="mb-4" />
        
        <div className="flex justify-between mb-2">
          <span className="text-snaplend-600">Subtotal</span>
          <span className="font-medium">₹{getCartTotal()}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
          <Link to="/checkout">
            <Button className="w-full">Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

import { ShoppingCart } from "lucide-react";

export default CartItems;
