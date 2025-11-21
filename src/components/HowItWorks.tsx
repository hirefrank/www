export function HowItWorks() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-16 md:gap-12">
          {[
            {
              step: "01",
              title: "Book a Free Intro Call",
              desc: "We discuss your challenges and see if we are a good fit.",
            },
            {
              step: "02",
              title: "Define Your Growth Plan",
              desc: "We map out a custom strategy tailored to your goals.",
            },
            {
              step: "03",
              title: "Begin Your Coaching Sessions",
              desc: "We start the work of transforming your leadership.",
            },
          ].map((item, index) => (
            <div
              key={item.step}
              className={`relative p-8 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up animation-delay-${(index + 1) * 200}`}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg ring-4 ring-white">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mt-6 mb-4">
                {item.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
