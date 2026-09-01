<template>
  <section id="work" class="py-10 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
      <div>
        <h2 class="text-3xl sm:text-4xl font-display font-bold text-text-main">
          Selected Work
        </h2>
        <p class="text-text-muted mt-1.5 text-xs sm:text-sm font-body">
          A showcase of recent digital platforms, Web3 apps, and full-stack solutions.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="toggleFeaturedFilter"
          class="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all font-mono"
          :class="showOnlyFeatured ? 'bg-accent text-background border-accent shadow-md shadow-accent/20' : 'bg-surface text-text-muted border-surface2 hover:text-white'"
        >
          {{ showOnlyFeatured ? '★ Featured Work' : 'Show All (Archive)' }}
        </button>
      </div>
    </div>
    
    <!-- Loading Skeletons -->
    <div v-if="projectsStore.loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="n in 4" :key="n" class="animate-pulse bg-surface h-80 rounded-2xl border border-surface2"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="projectsStore.error" class="p-8 text-center text-rose-400 bg-surface rounded-2xl border border-rose-500/20">
      <p class="text-base font-semibold">Failed to load projects</p>
      <p class="text-xs text-slate-400 mt-1">{{ projectsStore.error }}</p>
      <button @click="loadPage(1)" class="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-mono">
        Retry
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="displayedProjects.length === 0" class="p-12 text-center text-text-muted bg-surface rounded-2xl border border-surface2">
      <p class="font-display text-base text-slate-300">No projects found for this selection.</p>
      <button
        v-if="showOnlyFeatured"
        @click="toggleFeaturedFilter"
        class="mt-3 text-xs text-accent hover:underline font-mono"
      >
        View all archived projects &rarr;
      </button>
    </div>

    <!-- Projects Grid -->
    <div v-else class="space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="project in displayedProjects"
          :key="project._id"
          class="bg-surface rounded-2xl overflow-hidden group cursor-pointer border border-surface2 hover:border-accent/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
          @click="$emit('open-project', project)"
        >
          <!-- Cover Media Preview -->
          <div class="h-52 sm:h-60 bg-surface2 relative overflow-hidden">
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
            <div v-if="project.featured" class="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-background/85 backdrop-blur-md text-accent border border-accent/30 shadow-lg font-mono">
              Featured
            </div>
          </div>

          <!-- Details -->
          <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-display font-bold text-text-main group-hover:text-accent transition-colors mb-2">
                {{ project.title }}
              </h3>
              <p class="text-text-muted font-body text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                {{ project.description }}
              </p>
            </div>

            <!-- Tags & CTA -->
            <div class="pt-4 border-t border-surface2/60 flex items-center justify-between flex-wrap gap-2">
              <div class="flex flex-wrap gap-1.5 max-w-[70%]">
                <span
                  v-for="tag in (project.stackTags || []).slice(0, 3)"
                  :key="tag"
                  class="px-2 py-0.5 rounded text-[10px] font-medium bg-surface2 text-slate-300 border border-slate-700/50 font-mono"
                >
                  {{ tag }}
                </span>
                <span v-if="(project.stackTags || []).length > 3" class="text-[10px] text-text-muted self-center font-mono">
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

      <!-- Pagination Navigation Controls -->
      <div
        v-if="projectsStore.pagination && projectsStore.pagination.totalPages > 1"
        class="flex items-center justify-center gap-2 pt-6 border-t border-surface2"
      >
        <!-- Previous Button -->
        <button
          @click="loadPage(projectsStore.pagination.currentPage - 1)"
          :disabled="!projectsStore.pagination.hasPrevPage || projectsStore.loading"
          class="px-3.5 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          :class="projectsStore.pagination.hasPrevPage ? 'bg-surface hover:bg-slate-800 border-surface2 text-slate-200' : 'bg-surface/50 border-surface2/50 text-slate-500'"
        >
          &larr; Prev
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center gap-1.5">
          <button
            v-for="page in projectsStore.pagination.totalPages"
            :key="page"
            @click="loadPage(page)"
            :disabled="projectsStore.loading"
            class="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-all"
            :class="page === projectsStore.pagination.currentPage ? 'bg-accent text-background shadow-md shadow-accent/25 scale-105' : 'bg-surface hover:bg-slate-800 border border-surface2 text-slate-400 hover:text-white'"
          >
            {{ page }}
          </button>
        </div>

        <!-- Next Button -->
        <button
          @click="loadPage(projectsStore.pagination.currentPage + 1)"
          :disabled="!projectsStore.pagination.hasNextPage || projectsStore.loading"
          class="px-3.5 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          :class="projectsStore.pagination.hasNextPage ? 'bg-surface hover:bg-slate-800 border-surface2 text-slate-200' : 'bg-surface/50 border-surface2/50 text-slate-500'"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjectsStore } from '../../stores/projects'

const projectsStore = useProjectsStore()
const showOnlyFeatured = ref(true)
const pageSize = 4

const displayedProjects = computed(() => {
  return [...projectsStore.projects].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
})

const loadPage = (page) => {
  projectsStore.fetchProjects({
    page,
    limit: pageSize,
    featured: showOnlyFeatured.value ? true : null
  })
}

const toggleFeaturedFilter = () => {
  showOnlyFeatured.value = !showOnlyFeatured.value
  loadPage(1)
}

onMounted(() => {
  loadPage(1)
})
</script>
