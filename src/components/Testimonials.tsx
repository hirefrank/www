import { testimonials } from "~/data/content";
import type { Testimonial } from "~/data/content";

// Compute size tier from quote length at build time
type SizeTier = "large" | "medium" | "small";
function getSizeTier(quote: string): SizeTier {
  const len = quote.length;
  if (len < 140) return "large";
  if (len < 200) return "medium";
  return "small";
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const size = getSizeTier(testimonial.quote);

  // Font size based on computed tier
  const textSize = {
    large: "text-xl md:text-2xl leading-relaxed",
    medium: "text-lg leading-relaxed",
    small: "text-base leading-relaxed",
  }[size];

  const padding = {
    large: "p-7",
    medium: "p-6",
    small: "p-5",
  }[size];

  return (
    <div className="group break-inside-avoid mb-4 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md hover:border-l-4 hover:border-l-accent-500 transition-all duration-300">
      <div className={`flex flex-col ${padding}`}>
        <p className={`text-neutral-600 ${textSize}`}>
          {testimonial.quote.trim()}
        </p>

        {/* Attribution */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-100">
          <div className="w-9 h-9 rounded-full bg-accent-100 flex items-center justify-center text-accent-700 font-bold text-sm shrink-0">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-neutral-900 text-sm">
              {testimonial.name}
            </div>
            {(testimonial.title || testimonial.company) && (
              <div className="text-neutral-500 text-xs">
                {testimonial.title}
                {testimonial.title && testimonial.company && (
                  <span className="text-accent-600">
                    {" "}
                    · {testimonial.company}
                  </span>
                )}
                {!testimonial.title && testimonial.company && (
                  <span className="text-accent-600">{testimonial.company}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-700 font-medium text-sm mb-4">
            {testimonials.section.badge}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-neutral-900">
            {testimonials.section.title}
          </h2>
        </div>

        {/* Masonry layout using CSS columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {testimonials.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
