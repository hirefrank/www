import { Check } from "lucide-react";
import { pricing } from "~/data/content";

export function Pricing() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-16">
          {pricing.title}
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {pricing.packages.map((pkg) => (
            <div
              key={pkg.name}
              className={
                pkg.featured
                  ? "bg-white rounded-2xl shadow-xl border-2 border-primary-600 p-8 flex flex-col relative z-10 hover:shadow-2xl transition-all duration-300"
                  : "bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              }
            >
              {pkg.badge && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                  {pkg.badge}
                </div>
              )}
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {pkg.name}
              </h3>
              <p className="text-neutral-600 text-[15px] mb-4">
                {pkg.description}
              </p>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-neutral-900">
                  {pkg.price}
                </span>
                {pkg.period && (
                  <span className="text-neutral-500 ml-2">{pkg.period}</span>
                )}
              </div>
              <p className="text-neutral-500 text-sm mb-8">{pkg.subtext}</p>
              <ul className="space-y-4 mb-8 flex-grow list-none p-0">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-[3px]" />
                    <span className="text-neutral-700 text-[15px]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                data-cal-link="hirefrank/discovery-call-initial"
                data-cal-namespace="discovery-call-initial"
                data-cal-config='{"layout":"month_view","theme":"light"}'
                className={
                  pkg.featured
                    ? "btn-primary w-full text-center shadow-md hover:shadow-lg cursor-pointer"
                    : "btn-secondary w-full text-center cursor-pointer"
                }
              >
                {pkg.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-neutral-500 text-sm max-w-2xl mx-auto">
          {pricing.footnote}
        </div>
      </div>
    </section>
  );
}
