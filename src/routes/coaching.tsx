import { createFileRoute } from '@tanstack/react-router'
import { PricingCard } from '~/components/PricingCard'
import { TestimonialCard } from '~/components/TestimonialCard'
import { plans, testimonials, faqs } from '~/data/coaching'

export const Route = createFileRoute('/coaching')({
  component: CoachingPage,
  head: () => ({
    meta: [
      { title: "Coaching - Frank Harris" },
      { name: "description", content: "Hands-on coaching for senior ICs, first-time managers, and seasoned VPs. ICF-aligned coaching grounded in 20+ years of leadership experience." },
      { property: "og:title", content: "Coaching - Frank Harris" },
      { property: "og:description", content: "Hands-on coaching for senior ICs, first-time managers, and seasoned VPs. ICF-aligned coaching grounded in 20+ years of leadership experience." },
    ],
  }),
})

function CoachingPage() {
  return (
    <div className="main-container simple-content">
      <h1>Hands-on Coaching</h1>

      <p>Building products is hard. Leading the people who build them? Harder.</p>

      <p>
        Whether it's stepping into a Staff+ role, managing a growing team, or navigating
        founder dynamics, coaching helps leaders move through uncertainty with more
        clarity, confidence, and impact.
      </p>

      <p>
        Frank works with senior ICs, first-time managers, and seasoned VPs across
        startups, scale-ups, and public companies &mdash; spanning B2B, B2C, regulated
        industries, and high-growth tech. His coaching is grounded in ICF-aligned
        principles and shaped by 20+ years of leadership experience at companies like
        Slack, Etsy, Google, Betterment, Casper, and InVision.
      </p>

      <p>
        Sessions are hands-on and reflective, blending structured frameworks, sharp
        questions, and metaphor-driven insight to help leaders operate with intention
        and grow on purpose.
      </p>

      <div className="services-section">
        <h2>Coaching Plans</h2>
        <div className="grid-responsive">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>

      <div className="services-section">
        <h2>What Clients Say</h2>
        <div className="grid-responsive-single">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <div className="services-section">
        <h2>FAQ</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
