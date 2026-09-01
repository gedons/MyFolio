import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

export function useMagnetic(targetRef) {
  onMounted(() => {
    if (!targetRef.value) return

    const el = targetRef.value

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      gsap.to(el, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.6,
        ease: 'power3.out'
      })
    }

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)

    onUnmounted(() => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    })
  })
}
