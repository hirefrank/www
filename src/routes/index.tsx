import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "~/components/Hero";
import { Benefits } from "~/components/Benefits";
import { HowItWorks } from "~/components/HowItWorks";
import { AboutPreview } from "~/components/AboutPreview";
import { Pricing } from "~/components/Pricing";
import { Testimonials } from "~/components/Testimonials";
import { FAQ } from "~/components/FAQ";
import { FinalCTA } from "~/components/FinalCTA";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Frank Harris - Executive Coach & Product Leader" },
      { name: "description", content: "Frank Harris helps senior ICs, VPs, and founders navigate complex leadership challenges, clarify strategy, and grow with intention." },
      { property: "og:title", content: "Frank Harris - Executive Coach & Product Leader" },
      { property: "og:description", content: "Frank Harris helps senior ICs, VPs, and founders navigate complex leadership challenges, clarify strategy, and grow with intention." },
    ],
  }),
});

function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <Benefits />
      <HowItWorks />
      <AboutPreview />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
