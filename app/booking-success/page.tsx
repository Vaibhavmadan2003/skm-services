"use client";

import { Check, Calendar, MapPin, Phone, Download, Share2, Home } from "lucide-react";
import Link from "next/link";

export default function BookingSuccessPage() {
  const bookingDetails = {
    bookingId: "BK-2024-001234",
    serviceType: "Regular Cleaning",
    date: "Today, 2:00 PM",
    address: "Villa 123, Doha, Qatar",
    price: "149 QAR",
    duration: "2-4 Hours",
    teamSize: "2 Professionals",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <Link href="/" className="text-emerald-600 font-bold hover:text-emerald-700">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Success Content */}
      <div className="container-custom py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse opacity-20"></div>
                <div className="flex items-center justify-center h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full">
                  <Check className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Your cleaning service has been successfully booked.
            </p>
            <p className="text-lg text-gray-500">
              Confirmation email sent to john@example.com
            </p>
          </div>

          {/* Booking Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>

            <div className="mb-6 pb-6 border-b-2 border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Booking ID</p>
              <p className="text-2xl font-bold text-emerald-600 font-mono">{bookingDetails.bookingId}</p>
            </div>

            {/* Service Info Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Service Type */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-100">
                    <span className="text-xl">✨</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service Type</p>
                  <p className="font-bold text-gray-900">{bookingDetails.serviceType}</p>
                  <p className="text-xs text-gray-500 mt-1">{bookingDetails.duration}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-bold text-gray-900">{bookingDetails.date}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 col-span-2">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service Address</p>
                  <p className="font-bold text-gray-900">{bookingDetails.address}</p>
                </div>
              </div>

              {/* Team */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100">
                    <span className="text-xl">👥</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Team Size</p>
                  <p className="font-bold text-gray-900">{bookingDetails.teamSize}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100">
                    <span className="text-xl">💰</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Paid</p>
                  <p className="font-bold text-emerald-600 text-lg">{bookingDetails.price}</p>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-emerald-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">What to Expect</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold mt-1">✓</span>
                  <span className="text-gray-700">You'll receive a call 30 minutes before arrival</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold mt-1">✓</span>
                  <span className="text-gray-700">Our team will be professional, courteous, and background-checked</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold mt-1">✓</span>
                  <span className="text-gray-700">We use eco-friendly, non-toxic cleaning products</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold mt-1">✓</span>
                  <span className="text-gray-700">Service is 100% insured and guaranteed</span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">Need Help?</p>
                <p className="text-gray-600 text-sm">Call us at +974 4410 1234 or email support@skm-services.qa</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all font-semibold text-gray-900">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all font-semibold text-gray-900">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all font-semibold text-gray-900"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>

            <div className="space-y-4">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer py-4 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-gray-900">
                  <span>Can I reschedule my appointment?</span>
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="py-4 px-4 text-gray-600 text-sm">
                  Yes, you can reschedule your appointment up to 24 hours before your scheduled time. Contact our support team or use the app to manage your booking.
                </p>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer py-4 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-gray-900">
                  <span>What if I'm not satisfied?</span>
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="py-4 px-4 text-gray-600 text-sm">
                  We offer a 100% satisfaction guarantee. If you're not happy with the service, we'll send our team back to make it right at no extra cost.
                </p>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer py-4 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-gray-900">
                  <span>Are there any additional charges?</span>
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="py-4 px-4 text-gray-600 text-sm">
                  No, the price you paid is the final price. We believe in transparent pricing with no hidden charges.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
