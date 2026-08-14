"use client";

import { Sparkles, Clock, Shield } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Regular Cleaning",
      description: "Weekly or bi-weekly maintenance",
      price: "From 149 QAR",
      duration: "2-4 Hours",
      icon: "🧹",
      features: ["Dusting", "Vacuuming", "Mopping", "Bathrooms"],
      rating: "4.9⭐"
    },
    {
      title: "Deep Cleaning",
      description: "Intensive every 2-3 months",
      price: "From 299 QAR",
      duration: "4-6 Hours",
      icon: "✨",
      features: ["Everything in Regular", "Behind Furniture", "Carpet Cleaning", "Sanitization"],
      rating: "4.9⭐",
      badge: "Popular"
    },
    {
      title: "Move-In/Out",
      description: "Perfect for handover inspection",
      price: "From 349 QAR",
      duration: "5-8 Hours",
      icon: "📦",
      features: ["Move-out ready", "Deep disinfection", "Cabinet cleaning", "Full inspection"],
      rating: "4.9⭐"
    }
  ];

  return (
    <section id="services" className="section-spacing bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600">
            Professional cleaning tailored to your needs
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group hover-lift relative bg-white border-2 border-gray-100 rounded-2xl p-8 transition-all"
            >
              {/* Badge */}
              {service.badge && (
                <div className="absolute -top-3 left-6 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  {service.badge}
                </div>
              )}

              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>

              {/* Price & Duration */}
              <div className="flex justify-between items-center mb-6 pb-6 border-b-2 border-gray-100">
                <div>
                  <p className="text-sm text-gray-600">Starting from</p>
                  <p className="text-2xl font-bold text-emerald-600">{service.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-bold text-gray-900">{service.duration}</p>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="text-emerald-500 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Rating & Button */}
              <div className="flex gap-3 items-center">
                <span className="text-sm font-bold text-gray-900">{service.rating}</span>
                <button className="flex-1 bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition-colors font-semibold">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Our Services */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What's Included in Every Service
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "🛡️", title: "100% Insured", desc: "All services protected" },
              { icon: "✓", title: "Background Checked", desc: "Vetted professionals" },
              { icon: "⚡", title: "24/7 Support", desc: "Anytime assistance" },
              { icon: "💚", title: "Eco-Friendly", desc: "Green products only" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="font-bold text-gray-900 mb-1">{item.title}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
