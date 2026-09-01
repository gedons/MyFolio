<template>
  <section id="stack" class="py-24 px-6 max-w-7xl mx-auto border-t border-surface2">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-4xl md:text-5xl font-display font-bold text-text-main mb-4">
        Tech Stack & Tooling
      </h2>
      <p class="text-text-muted font-body text-base">
        A curated selection of languages, frameworks, and infrastructure tools I use to engineer robust, scalable software.
      </p>
    </div>

    <!-- Categorized Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="category in categories"
        :key="category.title"
        class="bg-surface rounded-2xl p-6 border border-surface2 hover:border-accent/50 transition-all duration-300 group"
      >
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-surface2 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
            <component :is="category.icon" class="w-5 h-5" />
          </div>
          <h3 class="font-display font-bold text-white text-base">
            {{ category.title }}
          </h3>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in category.skills"
            :key="tech"
            class="px-3 py-1.5 rounded-lg bg-surface2/60 text-slate-300 text-xs font-medium border border-surface2 hover:text-white hover:border-accent/40 transition-colors"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h } from 'vue'

const CodeIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' })
])

const ServerIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01' })
])

const CubeIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const DatabaseIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' })
])

const categories = [
  {
    title: 'Languages & Core',
    icon: CodeIcon,
    skills: ['Go (Golang)', 'Python', 'TypeScript', 'JavaScript', 'PHP']
  },
  {
    title: 'Frontend & Meta',
    icon: CubeIcon,
    skills: ['Vue 3', 'Nuxt.js', 'React', 'Tailwind CSS', 'Vite', 'Pinia']
  },
  {
    title: 'Backend & APIs',
    icon: ServerIcon,
    skills: ['Node.js', 'Express', 'Laravel', 'REST APIs', 'GraphQL', 'JWT']
  },
  {
    title: '3D, Data & Cloud',
    icon: DatabaseIcon,
    skills: ['Three.js', 'TresJS', 'MongoDB', 'PostgreSQL', 'Cloudinary', 'Docker']
  }
]
</script>
