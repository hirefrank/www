import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { faq } from "~/data/content";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-16">
          {faq.title}
        </h2>
        <div className="space-y-4">
          {faq.questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "border rounded-xl overflow-hidden transition-colors duration-300",
                  isOpen
                    ? "border-secondary-400 shadow-md"
                    : "border-neutral-200 hover:border-secondary-300"
                )}
              >
                <button
                  className="w-full flex justify-between items-center p-6 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-inset"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-neutral-900 pr-4">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-all duration-300 ease-out",
                      isOpen
                        ? "rotate-180 text-secondary-600"
                        : "rotate-0 text-neutral-500"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 bg-white text-neutral-600 leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
