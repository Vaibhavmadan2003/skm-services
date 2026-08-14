"use client";

export default function Pricing() {
  const pricingTiers = [
    {
      name: "Regular Cleaning",
      description: "Weekly or bi-weekly upkeep",
      icon: "🧹",
      packages: [
        { size: "Studio", cleaners: "1", hours: "2-2.5h", price: "150 QAR" },
        { size: "1 Bedroom", cleaners: "1", hours: "2.5-3h", price: "180 QAR" },
        { size: "2 Bedroom", cleaners: "1-2", hours: "3-4h", price: "250 QAR" },
        { size: "3+ Bedroom", cleaners: "2-3", hours: "4-5h", price: "350 QAR" }
      ]
    },
    {
      name: "Deep Cleaning",
      description: "Every 2-3 months for thorough cleaning",
      icon: "✨",
      packages: [
        { size: "Studio", cleaners: "2", hours: "3-4h", price: "300 QAR" },
        { size: "1 Bedroom", cleaners: "2", hours: "4-5h", price: "400 QAR" },
        { size: "2 Bedroom", cleaners: "2-3", hours: "5-6h", price: "550 QAR" },
        { size: "3+ Bedroom", cleaners: "3-4", hours: "6-8h", price: "800 QAR" }
      ]
    },
    {
      name: "Move-In/Out",
      description: "Perfect for handover inspection",
      icon: "📦",
      packages: [
        { size: "Studio", cleaners: "2", hours: "4h", price: "350 QAR" },
        { size: "1 Bedroom", cleaners: "2", hours: "5h", price: "450 QAR" },
        { size: "2 Bedroom", cleaners: "3", hours: "6-7h", price: "650 QAR" },
        { size: "3+ Bedroom", cleaners: "3-4", hours: "7-9h", price: "950 QAR" }
      ]
    }
  ];

  const addOns = [
    { name: "Oven Cleaning", price: "80-120 QAR" },
    { name: "Fridge Cleaning", price: "50-100 QAR" },
    { name: "Carpet Shampoo", price: "150-250 QAR" },
    { name: "Sofa Cleaning", price: "200-400 QAR" },
    { name: "Balcony Deep Clean", price: "60-120 QAR" },
    { name: "Window Cleaning", price: "100-180 QAR" }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            No hidden charges. Choose the package that fits your needs.
          </p>
        </div>

        {/* Pricing Tables */}
        <div className="space-y-12">
          {pricingTiers.map((tier, idx) => (
            <div key={idx} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-blue-600 text-white p-6">
                <div className="text-4xl mb-2">{tier.icon}</div>
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <p className="text-blue-100">{tier.description}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Property Size</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Cleaners</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Duration</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tier.packages.map((pkg, pidx) => (
                      <tr key={pidx} className="border-b hover:bg-blue-50 transition">
                        <td className="px-6 py-4 text-gray-900 font-medium">{pkg.size}</td>
                        <td className="px-6 py-4 text-gray-700">{pkg.cleaners}</td>
                        <td className="px-6 py-4 text-gray-700">{pkg.hours}</td>
                        <td className="px-6 py-4 font-bold text-blue-600">{pkg.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            ➕ Add-On Services
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {addOns.map((addon, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-900 font-medium">{addon.name}</span>
                <span className="text-blue-600 font-bold">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to book your cleaning?
          </h3>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-semibold">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}
