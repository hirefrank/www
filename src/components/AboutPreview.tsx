export function AboutPreview() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary-100 rounded-2xl transform rotate-6"></div>
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 bg-neutral-200">
                <img
                  src="/images/mug.jpg"
                  alt="Frank Harris"
                  className="w-full h-full object-cover object-top scale-110"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              A Partner in the Arena
            </h2>
            <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
              I'm Frank Harris, a product leader turned coach. My coaching is
              shaped by two decades in the arena at places like{" "}
              <span className="font-semibold text-neutral-900">Slack</span>,{" "}
              <span className="font-semibold text-neutral-900">Etsy</span>, and{" "}
              <span className="font-semibold text-neutral-900">Google</span>.
            </p>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              I help leaders navigate messy and high-stakes moments of growth
              like new roles, scaling teams, evolving strategies, and
              integrating AI into their work. I bring that experience to leaders
              through 1:1 coaching, helping you navigate your own path with
              confidence.
            </p>
            <a
              href="/about"
              className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition-colors group"
            >
              Learn more about me
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
