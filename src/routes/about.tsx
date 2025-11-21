import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

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

const impactStats = [
  { number: "20+", label: "Years Experience" },
  { number: "5", label: "VP-Level Roles" },
  { number: "100+", label: "Leaders Coached" },
  { number: "4", label: "FAANG Companies" },
];

const careerTimeline = [
  { year: "Early Career", company: "Google", highlight: "Created transit icons for Google Maps" },
  { year: "Pre-IPO", company: "Etsy", highlight: "Led search & discovery, launched ad platform" },
  { year: "Scale-up", company: "Betterment, Casper, InVision", highlight: "VP Product roles through rapid growth" },
  { year: "Enterprise", company: "Slack", highlight: "Led teams through organizational change" },
  { year: "Today", company: "Independent Coach", highlight: "Helping leaders grow with intention" },
];

const companyLogos = ["google", "etsy", "slack", "casper", "invision", "betterment"];

function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-accent-100/20 rounded-full blur-3xl -translate-x-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-8 tracking-tight animate-fade-in-up">
          About Frank
        </h1>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8 border-y border-neutral-100 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1 font-display">
                {stat.number}
              </div>
              <div className="text-sm text-neutral-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Lead paragraph */}
        <p className="lead text-xl text-neutral-800 mb-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          Frank Harris is a coach and former product executive with over 20
          years of experience building teams and products at companies like
          Slack, Etsy, and Google.
        </p>

        {/* Photo with rotation effect */}
        <div className="float-right ml-8 mb-8 w-full md:w-1/2 lg:w-2/5 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="relative rounded-2xl overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              src="/images/speaking.jpg"
              alt="Frank Harris speaking"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-black/10 rounded-2xl"></div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-primary text-neutral-600 max-w-none animate-fade-in-up" style={{ animationDelay: "400ms" }}>
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

          {/* Pull Quote */}
          <blockquote className="my-8 pl-6 border-l-4 border-primary-400 bg-primary-50 py-4 pr-6 rounded-r-xl not-italic text-lg text-neutral-700">
            "His ability to bridge tech with human-friendly design shaped his approach to leadership coaching."
          </blockquote>

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
              href="/"
              className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 font-medium underline decoration-primary-200 hover:decoration-primary-800 transition-all group"
            >
              1:1 work
            </a>
            , tools like{" "}
            <a
              href="https://tryfrank.chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 font-medium underline decoration-primary-200 hover:decoration-primary-800 transition-all group"
            >
              Frankbot
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>{" "}
            (his AI coaching assistant), and{" "}
            <a
              href="https://franktakeaways.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 font-medium underline decoration-primary-200 hover:decoration-primary-800 transition-all group"
            >
              Frank Takeaways
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            , a weekly newsletter on product and leadership.
          </p>
        </div>

        {/* Company Logos */}
        <div className="my-16 py-8 border-y border-neutral-100 clear-both">
          <p className="text-center text-sm text-neutral-500 mb-6 uppercase tracking-wider font-medium">
            Leadership roles at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companyLogos.map(logo => (
              <img
                key={logo}
                src={`/images/logos/${logo}.png`}
                alt={logo}
                className="h-8 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        </div>

        {/* Career Timeline */}
        <div className="my-16">
          <h2 className="font-display text-2xl font-bold text-neutral-900 mb-8">
            The Journey
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200" />

            {careerTimeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-center mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary-500 rounded-full transform -translate-x-1.5 ring-4 ring-white z-10" />

                {/* Content card */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <span className="text-primary-600 font-medium text-sm">{item.year}</span>
                    <h3 className="font-bold text-neutral-900 mt-1">{item.company}</h3>
                    <p className="text-neutral-600 text-sm mt-2">{item.highlight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beyond Work Section */}
        <div className="mt-16 pt-12 border-t border-neutral-100">
          <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
            Beyond the Work
          </h2>

          <div className="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-2xl p-8">
            <p className="text-lg text-neutral-700 leading-relaxed">
              When not coaching, Frank can be found in Brooklyn with his wife, two young daughters,
              and an Italian truffle dog named <span className="font-semibold text-secondary-700">Enzo</span> who
              has yet to find a single truffle in the city. He remains optimistic.
            </p>
          </div>
        </div>

        {/* LinkedIn CTA */}
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
  );
}
