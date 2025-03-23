
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItems from "./CartItems";

const CartButton = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart size={20} className="text-peerly-600" />
          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 min-w-[18px] h-[18px] text-xs flex items-center justify-center">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart ({itemCount} items)</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 flex flex-col h-[calc(100vh-8rem)]">
          <CartItems />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;
