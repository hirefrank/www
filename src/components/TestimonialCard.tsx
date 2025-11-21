import { Testimonial } from '~/data/coaching'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="testimonial">
      <p className="testimonial-quote">"{testimonial.quote}"</p>
      <p className="testimonial-author">{testimonial.name}</p>
      <p className="testimonial-title">{testimonial.title}</p>
    </div>
  )
}
