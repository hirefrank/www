import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "What is the difference between the Pro and Premium plans?",
    a: "Pro is asynchronous (chat/AI only), while Premium includes live 1:1 video sessions.",
  },
  {
    q: 'What does "unlimited chat coaching" mean on the Pro plan?',
    a: "You can message me anytime, and I will respond within 24 hours (usually sooner) during business days.",
  },
  {
    q: "What does a typical live coaching session look like (Premium plan)?",
    a: "We focus on your current challenges, review progress on your goals, and practice difficult conversations or presentations.",
  },
  {
    q: "What is the commitment for the Premium plan?",
    a: "There is a 6-month minimum commitment to ensure we have enough time to make meaningful progress.",
  },
  {
    q: "What is your cancellation policy?",
    a: "For Pro, you can cancel anytime. For Premium, after the initial 6 months, it becomes month-to-month.",
  },
  {
    q: "Can I expense this with my company's L&D budget?",
    a: "Yes! Many clients use their L&D budget. I can provide an invoice that meets your company's requirements.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-16">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-neutral-200 rounded-xl overflow-hidden hover:border-primary-200 transition-colors duration-300"
            >
              <button
                className="w-full flex justify-between items-center p-6 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-neutral-900">{faq.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-500 transition-transform duration-300" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white border-t border-neutral-200 text-neutral-600 leading-relaxed animate-accordion-down">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
