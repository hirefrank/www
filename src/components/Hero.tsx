export function Hero() {
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
        >
          <source
            src="/videos/Video_Generation_Been_In_The_Arena_.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white [background:none] [-webkit-text-fill-color:inherit]">
          Building products is hard. <br className="hidden md:block" />
          <span className="text-primary-300 [-webkit-text-fill-color:inherit]">
            Leading the people who build them is harder.
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-neutral-200 max-w-3xl mx-auto leading-relaxed">
          Navigate your next moment of growth with a partner who's been in the
          arena — a 20-year veteran from Slack, Etsy, and Google.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://calendly.com/frankharris/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-4 shadow-lg shadow-primary-900/20 transform hover:scale-105 transition-all"
          >
            Book a Free Intro Call
          </a>
        </div>

        {/* Social Proof */}
        <div className="mt-20 border-t border-white/10 pt-8">
          <p className="text-sm uppercase tracking-widest text-neutral-400 mb-10 font-medium">
            TRUSTED BY LEADERS AT
          </p>
          <div className="flex flex-col items-center gap-10">
            {/* First row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
              <a href="https://graphite.dev" target="_blank" rel="noopener noreferrer" title="Graphite - Engineering productivity platform">
                <img src="/images/logos/graphite.png" alt="Graphite logo" className="h-16 w-auto rounded-xl hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://uber.com" target="_blank" rel="noopener noreferrer" title="Uber - Global mobility platform">
                <img src="/images/logos/uber.png" alt="Uber logo" className="h-16 w-auto rounded-xl hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://wise.com" target="_blank" rel="noopener noreferrer" title="Wise - International money transfer">
                <img src="/images/logos/wise.png" alt="Wise logo" className="h-16 w-auto rounded-xl hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://joinfleek.com" target="_blank" rel="noopener noreferrer" title="Fleek - Decentralized web platform">
                <img src="/images/logos/joinfleek.png" alt="Fleek logo" className="h-16 w-auto rounded-xl hover:opacity-80 transition-opacity" />
              </a>
            </div>
            {/* Second row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" title="Google - Global technology company">
                <img src="/images/logos/google.png" alt="Google logo" className="h-16 w-auto rounded-xl hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://cash.app" target="_blank" rel="noopener noreferrer" title="Cash App - Financial services platform">
                <img src="/images/logos/cash-app.png" alt="Cash App logo" className="h-16 w-auto rounded-xl hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://mytra.ai" target="_blank" rel="noopener noreferrer" title="Mytra - Robotics and automation">
                <img src="/images/logos/mytra.png" alt="Mytra logo" className="h-16 w-auto rounded-xl hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://mejuri.com" target="_blank" rel="noopener noreferrer" title="Mejuri - Fine jewelry brand">
                <img src="/images/logos/mejuri.png" alt="Mejuri logo" className="h-16 w-auto rounded-xl hover:opacity-80 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
