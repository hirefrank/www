import { useMemo } from "react";

const heroVideos = [
  "/videos/Rowing_Ritual_Dawn_Preparation_and_Partnership.mp4",
  "/videos/Runner_and_Coach_s_Golden_Hour_Training.mp4",
];

export function Hero() {
  // Randomly select a video on initial render
  const videoSrc = useMemo(() => {
    return heroVideos[Math.floor(Math.random() * heroVideos.length)];
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          key={videoSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white [background:none] [-webkit-text-fill-color:inherit]">
          Lead with clarity. <br className="hidden md:block" />
          <span className="text-primary-300 [-webkit-text-fill-color:inherit]">
            Grow with intention.
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-neutral-200 max-w-3xl mx-auto leading-relaxed">
          Executive coaching for product leaders navigating complexity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            data-cal-link="hirefrank/discovery-call-initial"
            data-cal-namespace="discovery-call-initial"
            data-cal-config='{"layout":"month_view","theme":"light"}'
            className="btn-primary text-lg px-8 py-4 shadow-lg shadow-primary-900/20 transform hover:scale-105 transition-all cursor-pointer"
          >
            Book a Free Intro Call
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-20 border-t border-white/10 pt-8">
          <p className="text-sm uppercase tracking-widest text-neutral-400 mb-10 font-medium">
            TRUSTED BY LEADERS AT
          </p>
          <div className="flex flex-col items-center gap-10">
            {/* First row */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16 items-center">
              <a href="https://graphite.dev" target="_blank" rel="noopener noreferrer" title="Graphite - Engineering productivity platform" className="p-2 -m-2 rounded-xl transition-opacity hover:opacity-80">
                <img src="/images/logos/graphite.png" alt="Graphite logo" className="h-12 sm:h-16 w-auto rounded-xl" />
              </a>
              <a href="https://uber.com" target="_blank" rel="noopener noreferrer" title="Uber - Global mobility platform" className="p-2 -m-2 rounded-xl transition-opacity hover:opacity-80">
                <img src="/images/logos/uber.png" alt="Uber logo" className="h-12 sm:h-16 w-auto rounded-xl" />
              </a>
              <a href="https://wise.com" target="_blank" rel="noopener noreferrer" title="Wise - International money transfer" className="p-2 -m-2 rounded-xl transition-opacity hover:opacity-80">
                <img src="/images/logos/wise.png" alt="Wise logo" className="h-12 sm:h-16 w-auto rounded-xl" />
              </a>
              <a href="https://joinfleek.com" target="_blank" rel="noopener noreferrer" title="Fleek - Decentralized web platform" className="p-2 -m-2 rounded-xl transition-opacity hover:opacity-80">
                <img src="/images/logos/joinfleek.png" alt="Fleek logo" className="h-12 sm:h-16 w-auto rounded-xl" />
              </a>
            </div>
            {/* Second row */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16 items-center">
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" title="Google - Global technology company" className="p-2 -m-2 rounded-xl transition-opacity hover:opacity-80">
                <img src="/images/logos/google.png" alt="Google logo" className="h-12 sm:h-16 w-auto rounded-xl" />
              </a>
              <a href="https://cash.app" target="_blank" rel="noopener noreferrer" title="Cash App - Financial services platform" className="p-2 -m-2 rounded-xl transition-opacity hover:opacity-80">
                <img src="/images/logos/cash-app.png" alt="Cash App logo" className="h-12 sm:h-16 w-auto rounded-xl" />
              </a>
              <a href="https://mytra.ai" target="_blank" rel="noopener noreferrer" title="Mytra - Robotics and automation" className="p-2 -m-2 rounded-xl transition-opacity hover:opacity-80">
                <img src="/images/logos/mytra.png" alt="Mytra logo" className="h-12 sm:h-16 w-auto rounded-xl" />
              </a>
              <a href="https://mejuri.com" target="_blank" rel="noopener noreferrer" title="Mejuri - Fine jewelry brand" className="p-2 -m-2 rounded-xl transition-opacity hover:opacity-80">
                <img src="/images/logos/mejuri.png" alt="Mejuri logo" className="h-12 sm:h-16 w-auto rounded-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
