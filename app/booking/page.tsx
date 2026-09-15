"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    serviceType: "regular",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to payment page
    window.location.href = "/payment";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center gap-4">
          <Link href="/" className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Book Your Service</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
              {/* Service Selection */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">Select Service Type</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "regular", name: "Regular Cleaning", price: "149 QAR" },
                    { id: "deep", name: "Deep Cleaning", price: "299 QAR" },
                    { id: "moveout", name: "Move-In/Out", price: "349 QAR" },
                  ].map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, serviceType: service.id }))}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.serviceType === service.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 bg-white hover:border-emerald-300"
                      }`}
                    >
                      <p className="font-bold text-gray-900">{service.name}</p>
                      <p className="text-sm text-emerald-600 font-semibold">{service.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Your Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+974 xxxx xxxx"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Service Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Service Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Your home address in Qatar"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any specific areas or special instructions?"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                Continue to Payment
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Sidebar - Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Booking Summary</h3>

              {/* Service Summary */}
              <div className="pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Service Type</p>
                <p className="text-lg font-bold text-gray-900">
                  {formData.serviceType === "regular"
                    ? "Regular Cleaning"
                    : formData.serviceType === "deep"
                    ? "Deep Cleaning"
                    : "Move-In/Out"}
                </p>
              </div>

              {/* Features */}
              <div className="pb-6 border-b border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">What's Included</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-emerald-500 font-bold">✓</span>
                    Professional Team
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-emerald-500 font-bold">✓</span>
                    Eco-Friendly Products
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-emerald-500 font-bold">✓</span>
                    100% Insured
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-emerald-500 font-bold">✓</span>
                    24/7 Support
                  </li>
                </ul>
              </div>

              {/* Price Info */}
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Estimated Price</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formData.serviceType === "regular"
                    ? "149"
                    : formData.serviceType === "deep"
                    ? "299"
                    : "349"}{" "}
                  QAR
                </p>
                <p className="text-xs text-gray-600 mt-2">Final price may vary based on property size</p>
              </div>

              {/* Trust Badges */}
              <div className="flex gap-2 justify-center pt-4">
                <div className="text-center flex-1">
                  <div className="text-2xl mb-1">🛡️</div>
                  <p className="text-xs font-semibold text-gray-700">Insured</p>
                </div>
                <div className="text-center flex-1">
                  <div className="text-2xl mb-1">✓</div>
                  <p className="text-xs font-semibold text-gray-700">Verified</p>
                </div>
                <div className="text-center flex-1">
                  <div className="text-2xl mb-1">⭐</div>
                  <p className="text-xs font-semibold text-gray-700">Rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
