"use client";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Fatima Al-Mohannadi",
      role: "Customer",
      rating: 5,
      text: "Excellent service! The cleaners were professional and thorough. My home has never looked better. Highly recommend HomeClean!",
      avatar: "👩"
    },
    {
      name: "Ahmed Hassan",
      role: "Business Owner",
      rating: 5,
      text: "I use HomeClean for both my home and office. Consistent quality, reliable team, and fair pricing. Best service in Qatar!",
      avatar: "👨"
    },
    {
      name: "Noura Al-Kaabi",
      role: "Customer",
      rating: 5,
      text: "Very professional team. They arrived on time, did an amazing job, and were respectful. I would recommend HomeClean to anyone.",
      avatar: "👩‍🦰"
    },
    {
      name: "Mohammed Rashid",
      role: "Customer",
      rating: 5,
      text: "Great experience! The deep cleaning service was exactly what we needed. The team was efficient and friendly. Will book again!",
      avatar: "👨‍💼"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Real reviews from satisfied customers across Qatar
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg p-8 border-l-4 border-blue-600"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h3 className="text-center text-xl font-bold text-gray-900 mb-8">
            Trusted by Thousands
          </h3>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">✓</p>
              <p className="text-gray-700 mt-2">Verified Reviews</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">✓</p>
              <p className="text-gray-700 mt-2">Certified Team</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">✓</p>
              <p className="text-gray-700 mt-2">Insured Services</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
