import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-16">
          Simple, Transparent Pricing
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Pro */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Pro</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-neutral-900">$99</span>
              <span className="text-neutral-500 ml-2">/month</span>
            </div>
            <p className="text-neutral-500 text-sm mb-6">or $999/year</p>
            <p className="text-neutral-600 mb-8">
              Asynchronous coaching via chat and AI. No live sessions.
            </p>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />{" "}
                <span className="text-neutral-700">Unlimited chat coaching</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />{" "}
                <span className="text-neutral-700">Access to Frankbot AI</span>
              </li>
            </ul>
            <a href="#" className="btn-secondary w-full text-center">
              Get Started
            </a>
          </div>

          {/* Premium */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-primary-600 p-8 flex flex-col relative transform md:-translate-y-4 z-10 hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Premium</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-neutral-900">$999</span>
              <span className="text-neutral-500 ml-2">/month</span>
            </div>
            <p className="text-neutral-500 text-sm mb-6">
              6-month minimum commitment
            </p>
            <p className="text-neutral-600 mb-8">
              Includes everything in Pro, plus two live 60-min sessions per
              month.
            </p>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />{" "}
                <span className="text-neutral-700">Everything in Pro</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />{" "}
                <span className="text-neutral-700">
                  2x 60-min live sessions/mo
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />{" "}
                <span className="text-neutral-700">Priority support</span>
              </li>
            </ul>
            <a
              href="#"
              className="btn-primary w-full text-center shadow-md hover:shadow-lg"
            >
              Get Started
            </a>
          </div>

          {/* Custom */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Custom</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-neutral-900">
                Let's Talk
              </span>
            </div>
            <p className="text-neutral-500 text-sm mb-6">&nbsp;</p>
            <p className="text-neutral-600 mb-8">
              For teams and organizations. Pooled sessions, Co-founder coaching,
              360-degree feedback.
            </p>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />{" "}
                <span className="text-neutral-700">Team coaching</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />{" "}
                <span className="text-neutral-700">360-degree feedback</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />{" "}
                <span className="text-neutral-700">Custom workshops</span>
              </li>
            </ul>
            <a href="#" className="btn-secondary w-full text-center">
              Contact Me
            </a>
          </div>
        </div>

        <div className="mt-12 text-center text-neutral-500 text-sm max-w-2xl mx-auto">
          Discounts are available for annual commitments. If you are funding
          your coaching personally (without a corporate budget), please inquire
          about special rates during your intro call.
        </div>
      </div>
    </section>
  );
}
