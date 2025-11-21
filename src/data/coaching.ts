export interface CoachingPlan {
  name: string
  price: string
  unit: string
  description: string
  features: string[]
}

export interface Testimonial {
  quote: string
  name: string
  title: string
}

export interface FAQ {
  question: string
  answer: string
}

export const plans: CoachingPlan[] = [
  {
    name: 'Individual Contributor',
    price: '$300',
    unit: 'per session',
    description: 'Accelerate your product career with focused, skill-building coaching.',
    features: [
      '45 minute remote session',
      'Product feedback',
      'Stakeholder management',
      'Career development planning',
      '2 session minimum',
    ],
  },
  {
    name: 'Leader',
    price: '$500',
    unit: 'per session',
    description: 'Elevate your leadership skills and navigate product challenges.',
    features: [
      '60 minute remote or NYC session',
      'Leading and scaling teams',
      'Guidance on product strategy',
      'Managing difficult conversations',
      'Go-to-market plans & pricing',
      'Navigating company milestones',
      '360 feedback from your team',
      'Generative AI strategy <sup class="text-accent">New!</sup>',
      'Custom prompts for executive needs <sup class="text-accent">New!</sup>',
      'Available on Slack between sessions',
      '12 session minimum',
    ],
  },
]

export const testimonials: Testimonial[] = [
  {
    quote: "Frank had a material, double digit percentage, impact on our revenue within a month of our first session. He combines a natural caring and thoughtfulness with a wealth of professional experience. If this is your first time stepping into a product leadership position, or are just looking for a thought partner, I don't think you'll regret giving Frank a try.",
    name: 'Tomas Reimers',
    title: 'Co-Founder, Graphite',
  },
  {
    quote: "As a first-time leader of digital product and technology teams, Frank's coaching was a game-changer. He was an exceptional sounding board, guiding me through essential operational processes like roadmap planning, project tracking, and goal setting. His insights into organizational structure and hiring were key to successfully scaling our tech team. Frank's hands-on approach was evident when he took the time to meet with one of my team members, which deepened our team's connection and boosted overall performance. His deep expertise made my transition into leadership smoother and far more effective.",
    name: 'Majed Masad',
    title: 'President, Mejuri',
  },
  {
    quote: "Frank is an incredible thought partner, and is the kind of person who makes you and your organization more stable, grounded and thoughtful. Frank and I have worked together at two companies, most recently when he was interim head of product at InVision while I was on parental leave. Frank is the person you want in your personal board of directors.  He has exceptionally high EQ and people sense -- he can provide empathy and humor that helps you navigate the hardest situations, and at the same time objectivity exactly when you need it. I've learned so much from him, and he made me so much better at my job.",
    name: 'Eleanor Morgan',
    title: 'CEO & Founder, Stealth Startup',
  },
  {
    quote: "I'm incredibly grateful for the mentorship and guidance Frank has provided me throughout my career. He's helped me navigate complex team dynamics, refine my product strategy, and overcome challenges I faced at work. With Frank's support, I've been able to grow into product leadership roles and develop the confidence necessary to succeed in this field. He is always available to offer practical advice, and a fresh perspective. I highly recommend him to anyone looking to take their product career to the next level.",
    name: 'Betty Liao',
    title: 'Product, Google',
  },
]

export const faqs: FAQ[] = [
  {
    question: 'What does a typical coaching session look like?',
    answer: 'Each session is tailored to the client\'s specific needs and goals. Sessions involve discussing current challenges, strategizing solutions, and supporting growth as a product leader.',
  },
  {
    question: 'How long are the coaching engagements?',
    answer: 'Coaching engagements typically last 3-6 months, but can be adjusted based on individual needs and progress. Regular reviews ensure the approach is optimized for maximum value.',
  },
  {
    question: 'Can this be expensed against a Learning & Development budget?',
    answer: 'Yes. Many clients use L&D budgets for coaching as it aligns with their career development goals. Detailed invoices are available for expense claims.',
  },
]
