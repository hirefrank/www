export function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient background - lighter at top, seamlessly flows into footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900" />

      {/* Subtle accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
          What's holding you back?
        </h2>
        <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
          Let's figure it out together. 30 minutes, no pressure.
        </p>
        <button
          data-cal-link="hirefrank/discovery-call-initial"
          data-cal-namespace="discovery-call-initial"
          data-cal-config='{"layout":"month_view","theme":"light"}'
          className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-2xl bg-accent-500 text-white hover:bg-accent-400 transition-all duration-300 shadow-xl shadow-accent-500/30 hover:shadow-2xl hover:shadow-accent-500/40 hover:scale-105 active:scale-95 group cursor-pointer"
        >
          Book a Free Intro Call
          <svg
            className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
