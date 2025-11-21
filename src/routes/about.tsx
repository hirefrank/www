import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About - Frank Harris" },
      { name: "description", content: "Frank Harris is a coach and former product executive with over 20 years of experience building teams and products at companies like Slack, Etsy, and Google." },
      { property: "og:title", content: "About - Frank Harris" },
      { property: "og:description", content: "Frank Harris is a coach and former product executive with over 20 years of experience building teams and products at companies like Slack, Etsy, and Google." },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-white animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-12 tracking-tight">
          About Frank
        </h1>

        <div className="prose prose-lg prose-primary text-neutral-600 max-w-none">
          <p className="lead text-xl text-neutral-800 mb-8">
            Frank Harris is a coach and former product executive with over 20
            years of experience building teams and products at companies like
            Slack, Etsy, and Google.
          </p>

          <div className="float-right ml-8 mb-8 w-full md:w-1/2 lg:w-2/5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="/images/speaking.jpg"
                alt="Frank Harris speaking"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-black/10 rounded-2xl"></div>
            </div>
          </div>

          <p>
            Frank's career spans engineering, design, and product leadership
            across startups, scale-ups, and public companies. He's known for
            combining deep technical intuition with design sensibility and a
            sharp sense of product strategy — a blend that shapes his coaching
            today.
          </p>

          <p>
            As a self-taught engineer, Frank joined Google as a UX designer and
            created the original transit icons for Google Maps — an early
            example of his ability to bridge tech with human-friendly design.
          </p>

          <p>
            He later joined Etsy as a product manager pre-IPO, where he played a
            pivotal role in enhancing search and discovery and led the launch of
            a high-margin, self-serve ad platform for sellers — one of their
            most successful revenue initiatives.
          </p>

          <p>
            Frank went on to hold VP roles at Betterment, Casper, InVision, and
            Slack, leading cross-functional teams through periods of rapid
            growth, product reinvention, and organizational change.
          </p>

          <p>
            Today, he works with senior ICs, VPs, and founders as a coach —
            helping them navigate complex leadership challenges, clarify
            strategy, and grow with intention.
          </p>

          <p>
            His practice is grounded in ICF-aligned coaching, supported by{" "}
            <a
              href="/coaching"
              className="text-primary-600 hover:text-primary-800 font-medium underline decoration-primary-200 hover:decoration-primary-800 transition-all"
            >
              1:1 work
            </a>
            , tools like{" "}
            <a
              href="https://tryfrank.chat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-800 font-medium underline decoration-primary-200 hover:decoration-primary-800 transition-all"
            >
              Frankbot
            </a>{" "}
            (his AI coaching assistant), and{" "}
            <a
              href="https://franktakeaways.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-800 font-medium underline decoration-primary-200 hover:decoration-primary-800 transition-all"
            >
              Frank Takeaways
            </a>
            , a weekly newsletter on product and leadership.
          </p>

          <p>
            He lives in Brooklyn, NY with his wife, two young daughters, and an
            Italian truffle dog that isn't of much use in the city.
          </p>

          <div className="mt-12 pt-8 border-t border-neutral-100">
            <a
              href="https://www.linkedin.com/in/hirefrank/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg font-semibold text-primary-600 hover:text-primary-800 transition-colors group"
            >
              View full career on LinkedIn
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
