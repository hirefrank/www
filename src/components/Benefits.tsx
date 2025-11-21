import { CheckCircle } from "lucide-react";

export function Benefits() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* Benefit 1: Founders */}
        <div id="founders" className="grid md:grid-cols-2 gap-12 items-center scroll-mt-24">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
              For Founders
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Leading a Startup is Lonely. <br />
              <span className="text-primary-600">
                You Don't Have to Build It Alone.
              </span>
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              As the de facto product leader, you're making high-stakes
              decisions in a vacuum. I act as your confidential sounding board,
              offering an experienced perspective on product strategy, roadmap
              planning, and investor narratives.
            </p>
            <ul className="space-y-4">
              {[
                "Confidential sounding board",
                "Product strategy & roadmap",
                "Investor narrative refinement",
              ].map((item) => (
                <li key={item} className="flex items-center text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-primary-600 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 bg-neutral-50 rounded-2xl h-96 w-full object-cover flex items-center justify-center border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <img
              src="/images/illustrations/founders.png"
              alt="Strategic Vision"
              className="w-full h-full object-contain p-8 mix-blend-multiply brightness-105 contrast-125"
            />
          </div>
        </div>

        {/* Benefit 2: Leaders & VPs */}
        <div id="leaders" className="grid md:grid-cols-2 gap-12 items-center scroll-mt-24">
          <div className="order-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-100 text-secondary-800 text-sm font-medium mb-4">
              For Leaders & VPs
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Scale Your Leadership Bench.
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              I provide the focused, 1:1 coaching that you don't have time for,
              helping your rising stars master the core skills of
              leadership — from giving tough feedback to managing stakeholders and
              motivating their teams.
            </p>
            <ul className="space-y-4">
              {[
                "Focused 1:1 coaching",
                "Mastering tough feedback",
                "Stakeholder management",
              ].map((item) => (
                <li key={item} className="flex items-center text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-secondary-600 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 bg-neutral-50 rounded-2xl h-96 w-full flex items-center justify-center border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <img
              src="/images/illustrations/scale.png"
              alt="Team Growth"
              className="w-full h-full object-contain p-8 mix-blend-multiply brightness-105 contrast-125"
            />
          </div>
        </div>

        {/* Benefit 3: ICs & New Managers */}
        <div id="ics" className="grid md:grid-cols-2 gap-12 items-center scroll-mt-24">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-100 text-accent-800 text-sm font-medium mb-4">
              For ICs & New Managers
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Go From High-Performer to <br />
              <span className="text-accent-600">High-Impact Leader.</span>
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Feeling stuck is frustrating when you know you're capable of more.
              I provide the candid feedback and actionable frameworks you need
              to unblock your career, increase your visibility, and lead with
              confidence — with or without a title.
            </p>
            <ul className="space-y-4">
              {[
                "Actionable frameworks",
                "Increase visibility",
                "Lead with confidence",
              ].map((item) => (
                <li key={item} className="flex items-center text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-accent-600 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 bg-neutral-50 rounded-2xl h-96 w-full flex items-center justify-center border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <img
              src="/images/illustrations/transform.png"
              alt="Career Acceleration"
              className="w-full h-full object-contain p-8 mix-blend-multiply brightness-105 contrast-125"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
