"use client";

import { useCartStore } from "@/store/useCartStore";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2, Smartphone, Banknote, CreditCard, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export default function CheckoutPage() {
  const { items, cartTotal, removeItem, clearCart } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod" | "card">("upi");
  const [upiId, setUpiId] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<null | {
    orderId: string;
    method: string;
    total: number;
    email: string;
    city: string;
  }>(null);

  // Form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Pathanapuram");
  const [postalCode, setPostalCode] = useState("689695");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const total = cartTotal();
  const shipping = total > 0 ? 15 : 0;
  const grandTotal = total + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `DEV-${Math.floor(100000 + Math.random() * 900000)}`;
    const methodLabel = 
      paymentMethod === "upi" ? (upiId.trim() ? `UPI (${upiId.trim()})` : "UPI") :
      paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Credit / Debit Card";
    
    setOrderSuccess({
      orderId,
      method: methodLabel,
      total: grandTotal,
      email: email || "customer@devamshi.com",
      city: city || "Kerala",
    });
    clearCart();
  };

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Navbar />

      <section className="pt-32 pb-24 px-4 md:px-8 max-w-[1600px] mx-auto">
        {/* SUCCESS CONFIRMATION SCREEN */}
        {orderSuccess ? (
          <div className="max-w-2xl mx-auto py-12 px-6 bg-white border border-neutral-200 text-center shadow-lg">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">
              Confirmation
            </span>
            <h1 className="text-3xl md:text-4xl font-light text-black tracking-tight mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-neutral-600 text-sm md:text-base max-w-lg mx-auto mb-8">
              Your order <span className="font-semibold text-black">#{orderSuccess.orderId}</span> has been placed successfully. A confirmation message will be sent to your phone and email.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-6 text-left mb-8 space-y-3">
              <div className="flex justify-between text-sm py-1 border-b border-neutral-200">
                <span className="text-neutral-500">Order Reference</span>
                <span className="font-semibold text-black">{orderSuccess.orderId}</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-neutral-200">
                <span className="text-neutral-500">Payment Method</span>
                <span className="font-semibold text-black">{orderSuccess.method}</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-neutral-200">
                <span className="text-neutral-500">Total Amount</span>
                <span className="font-semibold text-black">₹{orderSuccess.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-neutral-200">
                <span className="text-neutral-500">Delivery Location</span>
                <span className="font-medium text-black">{orderSuccess.city}, Kerala</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-neutral-500">Estimated Delivery</span>
                <span className="font-medium text-emerald-700">2 - 4 Business Days</span>
              </div>
            </div>

            {orderSuccess.method.includes("COD") ? (
              <div className="bg-amber-50 border border-amber-200 p-4 mb-8 text-left text-xs text-amber-900 flex items-start gap-3">
                <PackageCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Cash on Delivery (COD) Selected:</strong> Please keep ₹{orderSuccess.total.toFixed(2)} in cash or have your mobile UPI app ready to scan upon delivery.
                </p>
              </div>
            ) : null}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="px-8 py-4 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/collections"
                className="px-8 py-4 bg-white border border-neutral-300 text-black text-xs uppercase tracking-widest font-semibold hover:bg-neutral-50 transition-colors"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl md:text-5xl font-light tracking-tight text-black mb-12">
              CHECKOUT
            </h1>

            {items.length === 0 ? (
              <div className="text-center py-24 bg-neutral-50 border border-neutral-200 p-8 max-w-xl mx-auto">
                <h2 className="text-xl font-light text-black mb-4">Your cart is empty.</h2>
                <Link 
                  href="/shop"
                  className="inline-block border-b-2 border-black text-black hover:text-neutral-600 transition-colors pb-1 uppercase tracking-widest text-sm font-medium"
                >
                  Return to Shop
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                
                {/* Form Section */}
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <form className="space-y-12" onSubmit={handlePlaceOrder}>
                    
                    {/* 1. Contact Information */}
                    <div>
                      <h2 className="text-lg font-medium tracking-widest uppercase text-black mb-6 flex items-center gap-4">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-400 text-xs font-semibold">1</span>
                        Contact Information
                      </h2>
                      <div className="space-y-4">
                        <input 
                          type="email" 
                          placeholder="Email address" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border border-neutral-300 p-4 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                          required
                        />
                        <input 
                          type="tel" 
                          placeholder="Mobile number (for delivery SMS & UPI updates)" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white border border-neutral-300 p-4 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* 2. Shipping Address */}
                    <div>
                      <h2 className="text-lg font-medium tracking-widest uppercase text-black mb-6 flex items-center gap-4">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-400 text-xs font-semibold">2</span>
                        Shipping Address
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="First Name" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="col-span-2 md:col-span-1 w-full bg-white border border-neutral-300 p-4 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                          required
                        />
                        <input 
                          type="text" 
                          placeholder="Last Name" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="col-span-2 md:col-span-1 w-full bg-white border border-neutral-300 p-4 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                          required
                        />
                        <input 
                          type="text" 
                          placeholder="Address, Building, Street" 
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="col-span-2 w-full bg-white border border-neutral-300 p-4 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                          required
                        />
                        <input 
                          type="text" 
                          placeholder="City / Town (e.g. Pathanapuram, Adoor)" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="col-span-2 md:col-span-1 w-full bg-white border border-neutral-300 p-4 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                          required
                        />
                        <input 
                          type="text" 
                          placeholder="Postal Code / PIN" 
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="col-span-2 md:col-span-1 w-full bg-white border border-neutral-300 p-4 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* 3. Payment Method: UPI, COD, CARD */}
                    <div>
                      <h2 className="text-lg font-medium tracking-widest uppercase text-black mb-4 flex items-center gap-4">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-400 text-xs font-semibold">3</span>
                        Payment Method
                      </h2>
                      <p className="text-neutral-500 text-sm mb-6">Select your preferred payment method. All transactions are secure & encrypted.</p>
                      
                      <div className="space-y-4">
                        {/* OPTION 1: UPI */}
                        <div 
                          onClick={() => setPaymentMethod("upi")}
                          className={`p-5 border cursor-pointer transition-all ${
                            paymentMethod === "upi" 
                              ? "border-black bg-neutral-50 ring-1 ring-black" 
                              : "border-neutral-300 bg-white hover:border-neutral-400"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input 
                                type="radio" 
                                name="paymentMethod" 
                                checked={paymentMethod === "upi"}
                                onChange={() => setPaymentMethod("upi")}
                                className="w-4 h-4 text-black accent-black cursor-pointer"
                              />
                              <div className="flex items-center gap-2">
                                <Smartphone className="w-5 h-5 text-black" />
                                <span className="font-semibold text-black text-sm md:text-base">UPI</span>
                              </div>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1">
                              Instant Payment
                            </span>
                          </div>

                          {paymentMethod === "upi" && (
                            <div className="mt-5 pt-5 border-t border-neutral-200 space-y-3">
                              <label className="text-xs uppercase tracking-wider text-black font-semibold block">
                                UPI ID <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <input 
                                  type="text"
                                  placeholder="Enter your UPI ID (e.g. yourname@upi, 9876543210@paytm, user@oksbi)"
                                  value={upiId}
                                  onChange={(e) => setUpiId(e.target.value)}
                                  required={paymentMethod === "upi"}
                                  className="w-full bg-white border border-neutral-300 p-4 text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                                />
                              </div>
                              <p className="text-xs text-neutral-500">
                                A payment request of ₹{grandTotal.toFixed(2)} will be sent to your UPI ID upon clicking Pay Now.
                              </p>
                            </div>
                          )}
                        </div>

                        {/* OPTION 2: Cash on Delivery (COD) */}
                        <div 
                          onClick={() => setPaymentMethod("cod")}
                          className={`p-5 border cursor-pointer transition-all ${
                            paymentMethod === "cod" 
                              ? "border-black bg-neutral-50 ring-1 ring-black" 
                              : "border-neutral-300 bg-white hover:border-neutral-400"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input 
                                type="radio" 
                                name="paymentMethod" 
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                                className="w-4 h-4 text-black accent-black cursor-pointer"
                              />
                              <div className="flex items-center gap-2">
                                <Banknote className="w-5 h-5 text-black" />
                                <span className="font-semibold text-black text-sm md:text-base">Cash on Delivery (COD)</span>
                              </div>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider font-semibold bg-neutral-200 text-neutral-800 px-2.5 py-1">
                              Pay at Doorstep
                            </span>
                          </div>

                          {paymentMethod === "cod" && (
                            <div className="mt-5 pt-5 border-t border-neutral-200">
                              <div className="bg-white border border-neutral-200 p-4 space-y-2">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black">
                                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                  <span>Cash on Delivery Available</span>
                                </div>
                                <p className="text-xs text-neutral-600 leading-relaxed">
                                  Pay ₹{grandTotal.toFixed(2)} in cash or via mobile UPI QR code directly to the courier executive when your order reaches your doorstep.
                                </p>
                                <p className="text-[11px] text-neutral-500">
                                  No advance online payment required. Free cancellation before dispatch.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* OPTION 3: Credit / Debit Card */}
                        <div 
                          onClick={() => setPaymentMethod("card")}
                          className={`p-5 border cursor-pointer transition-all ${
                            paymentMethod === "card" 
                              ? "border-black bg-neutral-50 ring-1 ring-black" 
                              : "border-neutral-300 bg-white hover:border-neutral-400"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input 
                                type="radio" 
                                name="paymentMethod" 
                                checked={paymentMethod === "card"}
                                onChange={() => setPaymentMethod("card")}
                                className="w-4 h-4 text-black accent-black cursor-pointer"
                              />
                              <div className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-black" />
                                <span className="font-semibold text-black text-sm md:text-base">Credit / Debit Card</span>
                              </div>
                            </div>
                            <span className="text-xs text-neutral-500">Visa, Mastercard, RuPay</span>
                          </div>

                          {paymentMethod === "card" && (
                            <div className="mt-5 pt-5 border-t border-neutral-200 space-y-4">
                              <input 
                                type="text" 
                                placeholder="Card Number (16 digits)" 
                                className="w-full bg-white border border-neutral-300 p-3.5 text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                              />
                              <div className="grid grid-cols-2 gap-4">
                                <input 
                                  type="text" 
                                  placeholder="Expiration (MM / YY)" 
                                  className="w-full bg-white border border-neutral-300 p-3.5 text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                                />
                                <input 
                                  type="password" 
                                  placeholder="CVV (3 digits)" 
                                  maxLength={4}
                                  className="w-full bg-white border border-neutral-300 p-3.5 text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                                />
                              </div>
                              <input 
                                type="text" 
                                placeholder="Name on card" 
                                className="w-full bg-white border border-neutral-300 p-3.5 text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-black text-white py-5 uppercase tracking-widest text-sm font-semibold hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                    >
                      {paymentMethod === "upi" ? (
                        <span>Pay ₹{grandTotal.toFixed(2)} via UPI</span>
                      ) : paymentMethod === "cod" ? (
                        <span>Place Order with Cash on Delivery (₹{grandTotal.toFixed(2)})</span>
                      ) : (
                        <span>Pay ₹{grandTotal.toFixed(2)} via Card</span>
                      )}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-5 order-1 lg:order-2">
                  <div className="bg-neutral-50 border border-neutral-200 p-6 md:p-8 sticky top-28 shadow-xs">
                    <h3 className="text-lg font-medium tracking-widest uppercase text-black mb-8">Order Summary</h3>
                    
                    <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                          <div className="relative w-16 h-24 bg-neutral-200 flex-shrink-0 border border-neutral-200">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white rounded-full text-xs flex items-center justify-center font-medium">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <h4 className="text-black text-sm font-medium mb-1">{item.name}</h4>
                            <p className="text-neutral-500 text-xs tracking-wider uppercase mb-1">
                              {item.size?.includes("(") || item.size?.includes("Package") || item.size?.includes("Set") || item.size?.includes("Size") || item.size?.includes("Look") || item.size?.includes("Hair")
                                ? item.size 
                                : `Size: ${item.size}`}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id, item.size)}
                              className="text-[11px] uppercase tracking-wider text-neutral-400 hover:text-red-500 flex items-center gap-1 transition-colors w-fit cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                          <div className="text-black text-sm font-semibold flex items-center">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-neutral-200 pt-6 space-y-4">
                      <div className="flex justify-between text-neutral-600 text-sm">
                        <span>Subtotal</span>
                        <span className="text-black font-medium">₹{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-neutral-600 text-sm">
                        <span>Shipping</span>
                        <span className="text-black font-medium">₹{shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-black font-semibold text-lg pt-4 border-t border-neutral-200">
                        <span>Total</span>
                        <span>₹{grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-neutral-200 flex items-center gap-3 text-xs text-neutral-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Encrypted SSL payment checkout powered by Devamshi.</span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
