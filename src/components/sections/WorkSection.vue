<template>
  <section id="work" class="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
      <div>
        <h2 class="text-3xl sm:text-5xl font-display font-bold text-text-main">
          Selected Work
        </h2>
        <p class="text-text-muted mt-2 text-sm sm:text-base font-body">
          A showcase of recent digital platforms, Web3 apps, and full-stack solutions.
        </p>
      </div>

      <div class="flex items-center gap-2" v-if="hasNonFeaturedProjects">
        <button
          @click="showOnlyFeatured = !showOnlyFeatured"
          class="px-4 py-2 rounded-full text-xs font-semibold border transition-all font-mono"
          :class="showOnlyFeatured ? 'bg-accent text-background border-accent shadow-md shadow-accent/20' : 'bg-surface text-text-muted border-surface2 hover:text-white'"
        >
          {{ showOnlyFeatured ? '★ Featured Work' : 'Show All (Archive)' }}
        </button>
      </div>
    </div>
    
    <!-- Loading Skeletons -->
    <div v-if="projectsStore.loading" class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      <div v-for="n in 4" :key="n" class="animate-pulse bg-surface h-80 sm:h-96 rounded-2xl border border-surface2"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="projectsStore.error" class="p-8 text-center text-rose-400 bg-surface rounded-2xl border border-rose-500/20">
      <p class="text-base font-semibold">Failed to load projects</p>
      <p class="text-xs text-slate-400 mt-1">{{ projectsStore.error }}</p>
      <button @click="projectsStore.fetchProjects" class="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs">
        Retry
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="displayedProjects.length === 0" class="p-12 text-center text-text-muted bg-surface rounded-2xl border border-surface2">
      <p class="font-display text-lg text-slate-300">No active featured projects right now.</p>
      <button
        v-if="hasNonFeaturedProjects && showOnlyFeatured"
        @click="showOnlyFeatured = false"
        class="mt-3 text-xs text-accent hover:underline"
      >
        View all archived projects &rarr;
      </button>
    </div>

    <!-- Projects Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      <div
        v-for="project in displayedProjects"
        :key="project._id"
        class="bg-surface rounded-2xl overflow-hidden group cursor-pointer border border-surface2 hover:border-accent/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
        @click="$emit('open-project', project)"
      >
        <!-- Cover Media Preview -->
        <div class="h-56 sm:h-64 bg-surface2 relative overflow-hidden">
          <img
            v-if="project.coverImage || project.imageUrl"
            :src="project.coverImage || project.imageUrl"
            :alt="project.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-slate-600 font-display font-bold text-3xl">
            {{ project.title ? project.title[0] : 'P' }}
          </div>

          <!-- Featured Tag Overlay -->
          <div v-if="project.featured" class="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-background/85 backdrop-blur-md text-accent border border-accent/30 shadow-lg font-mono">
            Featured
          </div>
        </div>

        <!-- Details -->
        <div class="p-5 sm:p-8 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl sm:text-2xl font-display font-bold text-text-main group-hover:text-accent transition-colors mb-2">
              {{ project.title }}
            </h3>
            <p class="text-text-muted font-body text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
              {{ project.description }}
            </p>
          </div>

          <!-- Tags & CTA -->
          <div class="pt-4 border-t border-surface2/60 flex items-center justify-between flex-wrap gap-2">
            <div class="flex flex-wrap gap-1.5 max-w-[75%]">
              <span
                v-for="tag in (project.stackTags || []).slice(0, 3)"
                :key="tag"
                class="px-2 py-0.5 rounded text-[11px] font-medium bg-surface2 text-slate-300 border border-slate-700/50"
              >
                {{ tag }}
              </span>
              <span v-if="(project.stackTags || []).length > 3" class="text-[11px] text-text-muted self-center font-mono">
                +{{ project.stackTags.length - 3 }}
              </span>
            </div>

            <span class="text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center font-mono">
              Deep Dive &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjectsStore } from '../../stores/projects'

const projectsStore = useProjectsStore()

// Default to showing only Featured projects as toggled in Admin
const showOnlyFeatured = ref(true)

const hasNonFeaturedProjects = computed(() => {
  return projectsStore.projects.some(p => !p.featured)
})

const displayedProjects = computed(() => {
  const all = [...projectsStore.projects].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  if (showOnlyFeatured.value) {
    return all.filter(p => p.featured === true)
  }
  return all
})

onMounted(() => {
  projectsStore.fetchProjects()
})
</script>
