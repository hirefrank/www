import { CoachingPlan } from '~/data/coaching'

interface PricingCardProps {
  plan: CoachingPlan
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{plan.name}</h3>
      <div className="card-price">
        {plan.price} <span className="card-price-unit">{plan.unit}</span>
      </div>
      <p className="card-price-description">{plan.description}</p>
      <ul className="card-feature-list">
        {plan.features.map((feature, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: feature }} />
        ))}
      </ul>
      <a
        href="https://practice.do/hirefrank/coaching"
        target="_blank"
        rel="noopener noreferrer"
        className="card-button mt-auto"
      >
        Schedule Session
      </a>
    </div>
  )
}
