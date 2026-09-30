"use client";

import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, toggleCart, removeItem, updateQuantity, cartTotal, cartCount } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  const handleCheckout = () => {
    toggleCart();
    router.push("/checkout");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-[110] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-lg tracking-[0.2em] uppercase font-light text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Cart ({cartCount()})
              </h2>
              <button 
                onClick={toggleCart} 
                className="p-2 text-white/50 hover:text-white transition-colors" 
                title="Close cart"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/50 space-y-4">
                  <ShoppingBag className="w-12 h-12 opacity-20" />
                  <p className="text-sm uppercase tracking-widest">Your cart is empty</p>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 border-b border-white/30 text-white pb-1 hover:border-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6">
                    <div className="relative w-24 h-32 bg-white/5">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white text-sm font-medium mb-1">{item.name}</h3>
                          <p className="text-white/60 text-xs tracking-wider uppercase mb-3">
                            {item.size?.includes("(") || item.size?.includes("Package") || item.size?.includes("Set") || item.size?.includes("Size") || item.size?.includes("Look") || item.size?.includes("Hair")
                              ? item.size 
                              : `Size: ${item.size}`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-white/20 w-24">
                            <button 
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  removeItem(item.id, item.size);
                                } else {
                                  updateQuantity(item.id, item.size, item.quantity - 1);
                                }
                              }}
                              className="p-2 text-white/50 hover:text-white transition-colors"
                              title="Decrease quantity"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="flex-1 text-center text-white text-xs">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="p-2 text-white/50 hover:text-white transition-colors"
                              title="Increase quantity"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-xs uppercase tracking-wider text-white/40 hover:text-red-400 flex items-center gap-1 transition-colors"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                        <span className="text-white font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white/70 uppercase tracking-widest text-sm">Subtotal</span>
                  <span className="text-white text-xl font-light">₹{cartTotal().toFixed(2)}</span>
                </div>
                <p className="text-white/40 text-xs mb-6 font-light text-center">Shipping and taxes calculated at checkout.</p>
                <button 
                  type="button"
                  onClick={handleCheckout}
                  className="w-full block text-center bg-white text-black py-4 uppercase tracking-widest text-sm font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
