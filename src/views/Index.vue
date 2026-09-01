<template>
  <div class="relative w-full h-screen overflow-hidden bg-[#0a0a0a] text-text-main font-body">
    
    <!-- Core 3D World (Vanilla Three.js - Auto Resets & Smooths on Modals) -->
    <Homepage3DWorld
      :is-overlay-open="activeOverlay !== null || selectedProject !== null"
      @select-section="handleSectionSelect"
    />

    <!-- 1. Work / Projects Drawer -->
    <Transition name="slide-up">
      <div
        v-if="activeOverlay === 'work'"
        @click.self="closeOverlay"
        class="fixed inset-0 z-40 bg-background/85 backdrop-blur-xl flex flex-col justify-end sm:justify-center p-0 sm:p-6 overflow-y-auto"
      >
        <div class="bg-surface border border-surface2 rounded-t-3xl sm:rounded-3xl max-w-5xl w-full mx-auto p-5 sm:p-10 relative max-h-[92vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl">
          <!-- Mobile Drag Handle -->
          <div class="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 sm:hidden"></div>
          
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-surface2">
            <div>
              <h2 class="text-2xl sm:text-4xl font-display font-bold text-white">Selected Work</h2>
              <p class="text-xs sm:text-sm text-text-muted mt-0.5">Explore real production applications & case studies.</p>
            </div>
            <button
              @click="closeOverlay"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface2 hover:bg-slate-700 flex items-center justify-center text-text-muted hover:text-white transition-colors text-lg"
              title="Close (Esc)"
            >
              &times;
            </button>
          </div>

          <WorkSection @open-project="openProjectDetails" />
        </div>
      </div>
    </Transition>

    <!-- 2. About Drawer -->
    <Transition name="slide-up">
      <div
        v-if="activeOverlay === 'about'"
        @click.self="closeOverlay"
        class="fixed inset-0 z-40 bg-background/85 backdrop-blur-xl flex flex-col justify-end sm:justify-center p-0 sm:p-6 overflow-y-auto"
      >
        <div class="bg-surface border border-surface2 rounded-t-3xl sm:rounded-3xl max-w-4xl w-full mx-auto p-5 sm:p-10 relative max-h-[92vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl">
          <!-- Mobile Drag Handle -->
          <div class="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 sm:hidden"></div>

          <div class="flex items-center justify-between mb-6 pb-4 border-b border-surface2">
            <h2 class="text-2xl sm:text-4xl font-display font-bold text-white">About Gedoni Ani</h2>
            <button
              @click="closeOverlay"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface2 hover:bg-slate-700 flex items-center justify-center text-text-muted hover:text-white transition-colors text-lg"
              title="Close (Esc)"
            >
              &times;
            </button>
          </div>

          <AboutSection />
        </div>
      </div>
    </Transition>

    <!-- 3. Tech Stack Drawer -->
    <Transition name="slide-up">
      <div
        v-if="activeOverlay === 'stack'"
        @click.self="closeOverlay"
        class="fixed inset-0 z-40 bg-background/85 backdrop-blur-xl flex flex-col justify-end sm:justify-center p-0 sm:p-6 overflow-y-auto"
      >
        <div class="bg-surface border border-surface2 rounded-t-3xl sm:rounded-3xl max-w-4xl w-full mx-auto p-5 sm:p-10 relative max-h-[92vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl">
          <!-- Mobile Drag Handle -->
          <div class="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 sm:hidden"></div>

          <div class="flex items-center justify-between mb-6 pb-4 border-b border-surface2">
            <h2 class="text-2xl sm:text-4xl font-display font-bold text-white">Tech Stack & Tools</h2>
            <button
              @click="closeOverlay"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface2 hover:bg-slate-700 flex items-center justify-center text-text-muted hover:text-white transition-colors text-lg"
              title="Close (Esc)"
            >
              &times;
            </button>
          </div>

          <StackSection />
        </div>
      </div>
    </Transition>

    <!-- 4. Contact Drawer -->
    <Transition name="slide-up">
      <div
        v-if="activeOverlay === 'contact'"
        @click.self="closeOverlay"
        class="fixed inset-0 z-40 bg-background/85 backdrop-blur-xl flex flex-col justify-end sm:justify-center p-0 sm:p-6 overflow-y-auto"
      >
        <div class="bg-surface border border-surface2 rounded-t-3xl sm:rounded-3xl max-w-3xl w-full mx-auto p-5 sm:p-10 relative max-h-[92vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl">
          <!-- Mobile Drag Handle -->
          <div class="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 sm:hidden"></div>

          <div class="flex items-center justify-between mb-6 pb-4 border-b border-surface2">
            <div>
              <h2 class="text-2xl sm:text-4xl font-display font-bold text-white">Get In Touch</h2>
              <p class="text-xs text-text-muted mt-0.5">Available for full-time & contract roles.</p>
            </div>
            <button
              @click="closeOverlay"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface2 hover:bg-slate-700 flex items-center justify-center text-text-muted hover:text-white transition-colors text-lg"
              title="Close (Esc)"
            >
              &times;
            </button>
          </div>

          <ContactSection />
        </div>
      </div>
    </Transition>

    <!-- 5. Case Study Deep Dive Modal -->
    <Transition name="fade">
      <div
        v-if="selectedProject"
        @click.self="selectedProject = null"
        class="fixed inset-0 z-50 bg-background/90 backdrop-blur-2xl flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
      >
        <div class="bg-surface border border-surface2 rounded-t-3xl sm:rounded-3xl max-w-4xl w-full p-5 sm:p-10 relative max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
          <!-- Mobile Drag Handle -->
          <div class="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 sm:hidden"></div>

          <button
            @click="selectedProject = null"
            class="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface2 hover:bg-slate-700 flex items-center justify-center text-text-muted hover:text-white text-lg transition-colors"
            title="Close (Esc)"
          >
            &times;
          </button>
          
          <div class="mb-4 sm:mb-6 pr-10">
            <span v-if="selectedProject.featured" class="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-accent/20 text-accent border border-accent/30 inline-block mb-2">
              Featured Platform
            </span>
            <h2 class="text-2xl sm:text-4xl font-display font-bold text-white">{{ selectedProject.title }}</h2>
          </div>

          <div class="mb-5 sm:mb-6 h-48 sm:h-80 bg-surface2 rounded-2xl overflow-hidden border border-surface2 shadow-inner">
            <img
              v-if="selectedProject.coverImage || selectedProject.imageUrl"
              :src="selectedProject.coverImage || selectedProject.imageUrl"
              :alt="selectedProject.title"
              class="w-full h-full object-cover"
            />
          </div>

          <p class="text-sm sm:text-lg text-text-muted mb-5 leading-relaxed">{{ selectedProject.description }}</p>
          
          <div v-if="selectedProject.caseStudy" class="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-surface2/50 border border-surface2">
            <h4 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-accent font-display mb-2 sm:mb-3">Architecture & Case Study</h4>
            <p class="text-slate-300 text-xs sm:text-sm sm:text-base leading-relaxed whitespace-pre-line">{{ selectedProject.caseStudy }}</p>
          </div>
          
          <div class="flex gap-1.5 sm:gap-2 flex-wrap mb-6 sm:mb-8" v-if="selectedProject.stackTags && selectedProject.stackTags.length">
            <span
              v-for="tag in selectedProject.stackTags"
              :key="tag"
              class="bg-surface2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium text-slate-300 border border-slate-700"
            >
              {{ tag }}
            </span>
          </div>
          
          <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
            <a
              v-if="selectedProject.url"
              :href="selectedProject.url"
              target="_blank"
              class="bg-accent text-background px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold hover:bg-accent-hover transition-all text-xs sm:text-sm shadow-lg shadow-accent/20"
            >
              Visit Live Site &rarr;
            </a>

            <a
              v-if="selectedProject.githubUrl"
              :href="selectedProject.githubUrl"
              target="_blank"
              class="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-text-muted hover:text-white bg-surface2 hover:bg-slate-700 transition-colors text-xs sm:text-sm"
            >
              View Repository
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, onMounted, onBeforeUnmount } from 'vue'
import Homepage3DWorld from '../components/three/Homepage3DWorld.vue'

const WorkSection = defineAsyncComponent(() => import('../components/sections/WorkSection.vue'))
const StackSection = defineAsyncComponent(() => import('../components/sections/StackSection.vue'))
const AboutSection = defineAsyncComponent(() => import('../components/sections/AboutSection.vue'))
const ContactSection = defineAsyncComponent(() => import('../components/sections/ContactSection.vue'))

const activeOverlay = ref(null)
const selectedProject = ref(null)

const handleSectionSelect = (sectionId) => {
  if (sectionId === 'identity') {
    activeOverlay.value = null
  } else {
    activeOverlay.value = sectionId
  }
}

const closeOverlay = () => {
  activeOverlay.value = null
}

const openProjectDetails = (project) => {
  selectedProject.value = project
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    if (selectedProject.value) {
      selectedProject.value = null
    } else if (activeOverlay.value) {
      activeOverlay.value = null
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
