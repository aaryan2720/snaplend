
// Update the import at the top to include ShoppingCart
import { useCart } from "@/contexts/CartContext";
import { X, Star, Heart, ShoppingCart, ThumbsUp, Smile, Meh, Frown, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const CartItems = ({ getRatingIcon }) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  
  const increaseQuantity = (itemId) => {
    const item = cartItems.find(cartItem => cartItem.item.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  const decreaseQuantity = (itemId) => {
    const item = cartItems.find(cartItem => cartItem.item.id === itemId);
    if (item && item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    }
  };

  const removeItem = (itemId) => {
    removeFromCart(itemId);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <ShoppingCart size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
        <p className="text-gray-500 mb-6">Browse listings to find something to rent</p>
        <Button variant="outline" asChild>
          <a href="/">Explore listings</a>
        </Button>
      </div>
    );
  }

  return (
    <AnimatePresence initial={false}>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((cartItem) => (
          <motion.li 
            key={cartItem.item.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="py-4"
          >
            <div className="flex items-start">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={cartItem.item.image}
                  alt={cartItem.item.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="text-base font-medium text-gray-900">
                    {cartItem.item.title}
                  </h3>
                  <button
                    onClick={() => removeItem(cartItem.item.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <div className="flex items-center mr-3">
                    {getRatingIcon(cartItem.item.rating)}
                    <span className="ml-1">{cartItem.item.rating.toFixed(1)}</span>
                  </div>
                  <span>₹{cartItem.item.price} / day</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => decreaseQuantity(cartItem.item.id)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      disabled={cartItem.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{cartItem.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(cartItem.item.id)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ₹{(cartItem.item.price * cartItem.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
};

export default CartItems;
