<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-background">
    
    <!-- 3D Canvas Scene / Fallback -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <template v-if="useFallback">
        <div class="w-[80vw] h-[80vw] max-w-2xl max-h-2xl bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      </template>
      <template v-else>
        <HeroScene />
      </template>
    </div>
    
    <!-- Hero Content -->
    <div class="z-10 text-center flex flex-col items-center glass-panel p-8 sm:p-14 rounded-3xl border border-surface2/60 max-w-3xl w-full mx-auto my-8 shadow-2xl backdrop-blur-xl">
      <!-- Main Heading -->
      <h1 class="text-5xl sm:text-7xl md:text-8xl font-bold mb-4 font-display text-text-main hero-title tracking-tight">
        Gedoni Ani
      </h1>

      <!-- Professional Subtitle -->
      <p class="text-xl sm:text-2xl text-accent font-display font-medium mb-5 hero-subtitle">
        Software Engineer & Indie Developer
      </p>

      <!-- Description -->
      <p class="text-base sm:text-lg text-text-muted mb-8 font-body max-w-xl leading-relaxed">
        Specializing in modern full-stack architectures, high-performance web applications, and interactive 3D digital experiences.
      </p>

      <!-- Clean Action CTAs -->
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <div ref="ctaRef" class="inline-block">
          <a
            href="#work"
            class="bg-accent text-background px-8 py-3.5 rounded-full font-bold hover:bg-accent-hover transition-all font-body shadow-lg shadow-accent/20 hero-cta block text-sm sm:text-base"
          >
            Selected Work
          </a>
        </div>

        <a
          href="#contact"
          class="px-8 py-3.5 rounded-full font-medium text-text-muted hover:text-white bg-surface hover:bg-surface2 border border-surface2 transition-colors font-body text-sm sm:text-base"
        >
          Contact Me
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeroScene from '../three/HeroScene.vue'
import { useMagnetic } from '../../composables/useMagnetic'

const useFallback = ref(false)
const ctaRef = ref(null)

useMagnetic(ctaRef)

onMounted(() => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // Check hardware concurrency (rough heuristic for lower-end devices, typical mobile might have 4 or less)
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
  
  // Check user agent for mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Use fallback if reduced motion is requested, or if it's a mobile/low-end device
  if (prefersReducedMotion || (isMobile && isLowEnd)) {
    useFallback.value = true
  }
})
</script>

<style scoped>
.glass-panel {
  background: rgba(18, 18, 18, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
</style>
