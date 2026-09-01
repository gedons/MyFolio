<template>
  <section id="work" class="py-24 px-6 max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
      <div>
        <h2 class="text-4xl md:text-5xl font-display font-bold text-text-main">
          Selected Work
        </h2>
        <p class="text-text-muted mt-2 text-base font-body">
          A showcase of recent digital platforms, Web3 apps, and full-stack solutions.
        </p>
      </div>

      <div class="mt-4 md:mt-0 flex items-center gap-2">
        <button
          @click="showOnlyFeatured = !showOnlyFeatured"
          class="px-4 py-2 rounded-full text-xs font-semibold border transition-all"
          :class="showOnlyFeatured ? 'bg-accent text-background border-accent' : 'bg-surface text-text-muted border-surface2 hover:text-white'"
        >
          {{ showOnlyFeatured ? '★ Showing Featured' : 'All Projects' }}
        </button>
      </div>
    </div>
    
    <!-- Loading Skeletons -->
    <div v-if="projectsStore.loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div v-for="n in 4" :key="n" class="animate-pulse bg-surface h-96 rounded-2xl border border-surface2"></div>
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
      No projects found.
    </div>

    <!-- Projects Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="project in displayedProjects"
        :key="project._id"
        class="bg-surface rounded-2xl overflow-hidden group cursor-pointer border border-surface2 hover:border-accent/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
        @click="$emit('open-project', project)"
      >
        <!-- Cover Media Preview -->
        <div class="h-64 bg-surface2 relative overflow-hidden">
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
          <div v-if="project.featured" class="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-background/80 backdrop-blur-md text-accent border border-accent/30 shadow-lg">
            Featured
          </div>
        </div>

        <!-- Details -->
        <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-display font-bold text-text-main group-hover:text-accent transition-colors mb-2">
              {{ project.title }}
            </h3>
            <p class="text-text-muted font-body text-sm leading-relaxed line-clamp-2 mb-4">
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
              <span v-if="(project.stackTags || []).length > 3" class="text-[11px] text-text-muted self-center">
                +{{ project.stackTags.length - 3 }} more
              </span>
            </div>

            <span class="text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center">
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
const showOnlyFeatured = ref(false)

const displayedProjects = computed(() => {
  const all = [...projectsStore.projects].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  if (showOnlyFeatured.value) {
    return all.filter(p => p.featured)
  }
  return all
})

onMounted(() => {
  projectsStore.fetchProjects()
})
</script>
