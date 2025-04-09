
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Loader2, ShoppingBag, Star, ThumbsUp, Smile, Heart, ThumbsDown, Frown, Meh } from "lucide-react";
import { useState } from "react";
import CartItems from "./CartItems";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const CartButton = () => {
  const { getItemCount, getCartTotal, clearCart } = useCart();
  const itemCount = getItemCount();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate a short delay for a better UX
    setTimeout(() => {
      setIsOpen(false);
      navigate("/checkout");
      setIsCheckingOut(false);
    }, 800);
  };

  // Helper function to render rating icon based on rating value
  const getRatingIcon = (rating: number) => {
    if (rating >= 4.5) return <ThumbsUp size={16} className="text-green-500" />;
    if (rating >= 3.5) return <Smile size={16} className="text-green-400" />;
    if (rating >= 2.5) return <Meh size={16} className="text-yellow-500" />;
    if (rating >= 1.5) return <Frown size={16} className="text-orange-500" />;
    return <ThumbsDown size={16} className="text-red-500" />;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart size={20} className="text-snaplend-600" />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Badge className="absolute -top-1 -right-1 px-1.5 min-w-[18px] h-[18px] text-xs flex items-center justify-center">
                  {itemCount}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingCart size={18} className="mr-2" />
            Your Cart ({itemCount} items)
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 flex-1 overflow-auto">
          <CartItems getRatingIcon={getRatingIcon} />
        </div>
        
        {itemCount > 0 && (
          <SheetFooter className="mt-6 border-t pt-4">
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={handleCheckout} 
                  className="w-full" 
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Checkout
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => clearCart()} 
                  className="w-full"
                >
                  Clear Cart
                </Button>
              </div>
              <div className="text-center text-sm text-gray-500 mt-4">
                By proceeding to checkout, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline" onClick={() => setIsOpen(false)}>
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;
