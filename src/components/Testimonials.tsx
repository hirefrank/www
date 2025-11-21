export function Testimonials() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-16">
          Loved by Leaders Worldwide.
        </h2>

        <div
          className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-6 no-scrollbar"
          role="region"
          aria-label="Client testimonials"
        >
          {/* Testimonial 1 - Graphite */}
          <div className="snap-center shrink-0 w-full md:w-[600px] bg-neutral-50 p-8 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-6">
              {/* Graphite Logo Placeholder */}
              <span className="font-bold text-xl text-neutral-800">Graphite</span>
            </div>
            <blockquote className="text-xl text-neutral-700 italic mb-6 border-l-0 bg-transparent p-0">
              "Frank helped me navigate the transition from IC to manager. His
              advice is always practical and grounded in real experience."
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-neutral-300 rounded-full mr-4"></div>
              <div>
                <div className="font-bold text-neutral-900">Jane Doe</div>
                <div className="text-neutral-500 text-sm">Engineering Manager</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="snap-center shrink-0 w-full md:w-[600px] bg-neutral-50 p-8 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-6">
              <span className="font-bold text-xl text-neutral-800">Uber</span>
            </div>
            <blockquote className="text-xl text-neutral-700 italic mb-6 border-l-0 bg-transparent p-0">
              "The best investment I made in my career this year. Frank's
              coaching is worth every penny."
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-neutral-300 rounded-full mr-4"></div>
              <div>
                <div className="font-bold text-neutral-900">John Smith</div>
                <div className="text-neutral-500 text-sm">Director of Product</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="snap-center shrink-0 w-full md:w-[600px] bg-neutral-50 p-8 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-6">
              <span className="font-bold text-xl text-neutral-800">Wise</span>
            </div>
            <blockquote className="text-xl text-neutral-700 italic mb-6 border-l-0 bg-transparent p-0">
              "Frank is a fantastic listener and strategic thinker. He helped me
              clarify my vision and execute on it."
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-neutral-300 rounded-full mr-4"></div>
              <div>
                <div className="font-bold text-neutral-900">Sarah Jones</div>
                <div className="text-neutral-500 text-sm">VP of Engineering</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
