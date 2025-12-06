import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SAMPLE_TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Donald redesigned our onboarding flow and we saw a 42% increase in signups within a month.',
    name: 'Priya Sharma',
    title: 'Product Lead, FinTech Co', 
    avatar: 'https://i.pravatar.cc/120?img=5',
  },
  {
    id: 2,
    quote: 'Always ahead of deadline, and pragmatic about trade-offs. A joy to work with.',
    name: 'Liam Chen',
    title: 'CTO, SocialApp',
    avatar: 'https://i.pravatar.cc/120?img=12',
  },
  {
    id: 3,
    quote:
      'Took a messy design and turned it into a product that actually converts. Reliable and communicative.',
    name: 'Sara Gomez',
    title: 'Founder, HealthTech',
    avatar: 'https://i.pravatar.cc/120?img=25',
  },
  {
    id: 4,
    quote: 'Solid implementation, great documentation, and fast follow-ups.',
    name: 'Markus Lee',
    title: 'Engineering Manager, AdTech',
    avatar: 'https://i.pravatar.cc/120?img=32',
  },
]

export default function TestimonialSection({ testimonials = SAMPLE_TESTIMONIALS }) {
  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const hero = heroRef.current
    const grid = gridRef.current

    if (!section || !hero || !grid) return

    gsap.fromTo(
      hero,
      { y: 40, opacity: 0, scale: 0.995 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: hero,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    const cards = grid.querySelectorAll('.testimonial-card')
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    const cta = section.querySelector('.testimonial-cta')
    if (cta) {
      gsap.fromTo(
        cta,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="py-16 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-8 text-center">
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight text-white"
          >
            What clients & collaborators say
          </h2>
          <p className="text-gray-400 mt-2">Results-focused, reliable, and pragmatic.</p>
        </header>

        <div
          ref={heroRef}
          className="relative mb-10 flex flex-col items-center text-center px-6"
        >
          <blockquote className="max-w-3xl">
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-100">
              “{testimonials[0]?.quote ?? ''}”
            </p>

            <footer className="mt-6 flex items-center justify-center gap-3">
              <img
                src={testimonials[0]?.avatar}
                alt={`${testimonials[0]?.name} avatar`}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-700"
              />

              <div className="text-left">
                <div className="font-semibold text-white">{testimonials[0]?.name}</div>
                <div className="text-sm text-gray-400">{testimonials[0]?.title}</div>
              </div>
            </footer>
          </blockquote>

          <div className="mt-6 flex flex-wrap items-center gap-4 justify-center text-sm text-gray-400">
            <span className="px-3 py-1 bg-gray-800 rounded-full">10+ projects</span>
            <span className="px-3 py-1 bg-gray-800 rounded-full">98% client satisfaction</span>
            <span className="px-3 py-1 bg-gray-800 rounded-full">Worked across 3 countries</span>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(1).map((t) => (
            <article
              key={t.id}
              className="testimonial-card bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-800"
              aria-label={`Testimonial from ${t.name}`}
            >
              <p className="text-gray-200 mb-4 line-clamp-3">“{t.quote}”</p>

              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={`${t.name} avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-white">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.title}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center">
          <div className="testimonial-cta text-center">
            <p className="text-gray-300 mb-4">Want this kind of result?</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Contact me"
            >
              Let’s work together
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

TestimonialSection.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      quote: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
}
