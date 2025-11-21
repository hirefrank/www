// Content loaded from YAML files in /content
// Edit the YAML files directly - this file just provides types and imports

import pricingData from '../../content/pricing.yaml'
import testimonialsData from '../../content/testimonials.yaml'
import faqData from '../../content/faq.yaml'

// Types
export interface PricingPackage {
  name: string
  description: string
  price: string
  period: string
  subtext: string
  featured: boolean
  badge?: string
  cta: string
  features: string[]
}

export interface PricingContent {
  title: string
  footnote: string
  packages: PricingPackage[]
}

export interface Testimonial {
  name: string
  title?: string
  company?: string
  quote: string
}

export interface TestimonialsContent {
  section: {
    badge: string
    title: string
  }
  testimonials: Testimonial[]
}

export interface FAQItem {
  q: string
  a: string
}

export interface FAQContent {
  title: string
  questions: FAQItem[]
}

// Exports
export const pricing = pricingData as PricingContent
export const testimonials = testimonialsData as TestimonialsContent
export const faq = faqData as FAQContent
