"use client";

import { useState } from "react";
import { CreditCard, Lock, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "wallet">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Redirect to success page
    window.location.href = "/booking-success";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center gap-4">
          <Link href="/booking" className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Complete Payment</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <form onSubmit={handlePayment} className="space-y-8">
              {/* Payment Method Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Choose Payment Method</h2>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { id: "card" as const, name: "Credit Card", icon: "💳" },
                    { id: "bank" as const, name: "Bank Transfer", icon: "🏦" },
                    { id: "wallet" as const, name: "Digital Wallet", icon: "📱" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        paymentMethod === method.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 bg-white hover:border-emerald-300"
                      }`}
                    >
                      <p className="text-2xl mb-2">{method.icon}</p>
                      <p className="font-semibold text-gray-900 text-sm">{method.name}</p>
                    </button>
                  ))}
                </div>

                {/* Card Payment Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 mt-6 pt-6 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardData.cardName}
                        onChange={handleCardChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardChange}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-mono"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardData.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-mono"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Info */}
                {paymentMethod === "bank" && (
                  <div className="mt-6 pt-6 border-t border-gray-200 bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-3">Bank Transfer Details:</p>
                    <ul className="space-y-2 text-sm font-mono text-gray-900">
                      <li><strong>Bank Name:</strong> Doha Bank</li>
                      <li><strong>Account:</strong> 1234567890</li>
                      <li><strong>IBAN:</strong> QA58DOHQQ000123456789</li>
                      <li><strong>Reference:</strong> Use your booking ID</li>
                    </ul>
                  </div>
                )}

                {/* Digital Wallet Info */}
                {paymentMethod === "wallet" && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-gray-700 py-4">
                      Select your preferred digital wallet:
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="py-3 px-4 border-2 border-gray-300 rounded-lg hover:border-emerald-500 transition-colors text-center font-semibold text-gray-900">
                        Apple Pay
                      </button>
                      <button className="py-3 px-4 border-2 border-gray-300 rounded-lg hover:border-emerald-500 transition-colors text-center font-semibold text-gray-900">
                        Google Pay
                      </button>
                    </div>
                  </div>
                )}

                {/* Security Info */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                    <p className="text-xs text-gray-600 mt-1">All payments are encrypted and processed securely.</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Complete Payment
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>

              {/* Service Details */}
              <div className="pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Service</p>
                <p className="text-lg font-bold text-gray-900">Regular Cleaning</p>
                <p className="text-sm text-gray-600 mt-1">Scheduled for today at 2:00 PM</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <p className="text-gray-600">Service Fee</p>
                  <p className="font-semibold text-gray-900">149 QAR</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Cleaning Supplies</p>
                  <p className="font-semibold text-gray-900">Included</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Insurance</p>
                  <p className="font-semibold text-gray-900">Included</p>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4 bg-emerald-50 px-4 rounded-lg">
                <p className="font-bold text-gray-900">Total</p>
                <p className="text-2xl font-bold text-emerald-600">149 QAR</p>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">100% Secure</p>
                    <p className="text-xs text-gray-600">SSL Encrypted</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Money-Back Guarantee</p>
                    <p className="text-xs text-gray-600">30-day guarantee</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">24/7 Support</p>
                    <p className="text-xs text-gray-600">Always here to help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
