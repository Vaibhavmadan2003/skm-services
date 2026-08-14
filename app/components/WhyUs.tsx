"use client";

export default function WhyUs() {
  const reasons = [
    {
      title: "Verified Professionals",
      description: "Every cleaner is background-checked, trained, and verified",
      icon: "✓"
    },
    {
      title: "100% Satisfaction Guarantee",
      description: "Not satisfied? We'll make it right, no questions asked",
      icon: "⭐"
    },
    {
      title: "Transparent Pricing",
      description: "No hidden charges. You know exactly what you'll pay",
      icon: "💰"
    },
    {
      title: "24/7 Customer Support",
      description: "We're here whenever you need help or have questions",
      icon: "🛟"
    },
    {
      title: "Same-Day Service",
      description: "Need urgent cleaning? We can schedule same-day appointments",
      icon: "⚡"
    },
    {
      title: "Insured & Protected",
      description: "All services are fully insured and protected by guarantee",
      icon: "🛡️"
    }
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose HomeClean?
          </h2>
          <p className="text-lg text-gray-600">
            We're committed to excellence in every service we provide
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h3>
          <div className="grid md:grid-cols-4 gap-4 md:gap-2">
            {[
              { num: "1", title: "Choose Service", desc: "Select cleaning type" },
              { num: "2", title: "Select Time", desc: "Pick date & time" },
              { num: "3", title: "Confirm Booking", desc: "Review & pay" },
              { num: "4", title: "Enjoy Service", desc: "Professional cleaning" }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.num}
                </div>
                <div className="bg-white rounded-lg p-4 text-center border-2 border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-blue-600 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-8">
          {[
            { stat: "500+", label: "Professionals" },
            { stat: "4.9/5", label: "Rating" },
            { stat: "10k+", label: "Happy Customers" },
            { stat: "100%", label: "Guarantee" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-3xl font-bold text-blue-600 mb-2">{item.stat}</p>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
