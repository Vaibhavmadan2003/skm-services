"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I book a cleaning service?",
      answer: "Simply download our app or visit the website, select your service type, choose your preferred date and time, and complete the booking. You'll receive instant confirmation and can track the cleaner's arrival."
    },
    {
      question: "Are your cleaners vetted and trained?",
      answer: "Yes! Every cleaner on our platform is background-checked, professionally trained, and verified. We maintain the highest standards of professionalism and reliability."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy, simply let us know within 24 hours, and we'll send a team to fix it at no extra cost or provide a full refund."
    },
    {
      question: "Do you offer same-day bookings?",
      answer: "Yes! We offer same-day service availability in most areas. Simply book through our app and we'll confirm your appointment based on cleaner availability."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including credit cards, debit cards, and mobile wallets through our secure Razorpay integration. All payments are in Qatari Riyal (QAR)."
    },
    {
      question: "Is there a cancellation policy?",
      answer: "You can cancel bookings up to 24 hours before your scheduled time for a full refund. Cancellations within 24 hours may incur a small fee."
    },
    {
      question: "Do you provide cleaning supplies?",
      answer: "Yes, our team brings all necessary eco-friendly cleaning supplies. If you prefer specific products, please let us know during booking."
    },
    {
      question: "Can I book recurring services?",
      answer: "Absolutely! We offer flexible recurring plans - weekly, bi-weekly, or monthly. You can manage your recurring bookings anytime through our app."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Got questions? We've got answers
          </p>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-left">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`text-blue-600 transition-transform ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-6 py-4 border-t bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our 24/7 customer support team is ready to help
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              Chat with Us
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-semibold">
              Email Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
