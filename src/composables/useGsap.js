import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapAnimations() {
  let ctx

  onMounted(() => {
    ctx = gsap.context(() => {
      
      // Hero entrance animations
      const tl = gsap.timeline()
      tl.from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      })
      .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, "-=0.6")
      .from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, "-=0.4")

      // Scroll animations for sections
      const sections = gsap.utils.toArray('section:not(#hero)')
      sections.forEach((sec) => {
        gsap.from(sec, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%', // trigger when top of section hits 80% down viewport
            toggleActions: 'play none none reverse'
          }
        })
      })

    })
  })

  onUnmounted(() => {
    if (ctx) ctx.revert()
  })
}
