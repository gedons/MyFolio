<template>
  <div class="space-y-8">
    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Projects -->
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 relative overflow-hidden">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Projects</p>
            <p class="text-3xl font-display font-bold text-white mt-2">{{ projectsStore.projects.length }}</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center text-xs text-slate-400">
          <span class="text-sky-400 font-medium mr-1">{{ projectsStore.featuredProjects.length }}</span> featured on landing page
        </div>
      </div>

      <!-- Unread Inquiries -->
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 relative overflow-hidden">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Inquiries</p>
            <p class="text-3xl font-display font-bold text-white mt-2">{{ messagesStore.unreadCount }}</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center text-xs text-slate-400">
          Total received: <span class="text-white font-medium ml-1">{{ messagesStore.messages.length }}</span>
        </div>
      </div>

      <!-- Cloudinary Media Storage -->
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 relative overflow-hidden">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Media Engine</p>
            <p class="text-lg font-display font-bold text-white mt-2">Cloudinary CDN</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center text-xs text-emerald-400">
          <span class="w-2 h-2 rounded-full bg-emerald-400 mr-1.5"></span> Dropbox Retired &bull; Active
        </div>
      </div>
    </div>

    <!-- Quick Actions & Recent Projects -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Projects List -->
      <div class="lg:col-span-2 bg-[#161b22] border border-[#30363d] rounded-xl p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-display font-bold text-base text-white">Live Portfolio Projects</h3>
          <router-link to="/admin/projects" class="text-xs text-sky-400 hover:text-sky-300 font-medium">
            Manage all &rarr;
          </router-link>
        </div>

        <div v-if="projectsStore.loading" class="space-y-3">
          <div v-for="n in 3" :key="n" class="h-14 bg-slate-800/40 rounded-lg animate-pulse"></div>
        </div>

        <div v-else-if="projectsStore.projects.length === 0" class="text-center py-10 text-slate-400 text-sm">
          No projects found in database. Click "Add Project" to create one.
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="project in projectsStore.projects.slice(0, 5)"
            :key="project._id"
            class="flex items-center justify-between p-3 rounded-lg bg-[#0d1117] border border-[#30363d] hover:border-slate-600 transition-colors"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                <img
                  v-if="project.coverImage || project.imageUrl"
                  :src="project.coverImage || project.imageUrl"
                  :alt="project.title"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-xs text-slate-500 font-bold">
                  {{ project.title ? project.title[0] : 'P' }}
                </div>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-white">{{ project.title }}</h4>
                <p class="text-xs text-slate-400 truncate max-w-xs">{{ project.description }}</p>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <span
                v-if="project.featured"
                class="px-2 py-0.5 text-xs font-medium rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20"
              >
                Featured
              </span>
              <router-link
                :to="`/admin/projects`"
                class="text-xs text-slate-400 hover:text-white p-1"
              >
                Edit
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-6">
        <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
          <h3 class="font-display font-bold text-base text-white mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <router-link
              to="/admin/projects"
              class="w-full flex items-center justify-center px-4 py-3 bg-sky-500 hover:bg-sky-400 text-black font-semibold text-sm rounded-lg transition-all shadow-lg shadow-sky-500/20 font-display"
            >
              + Create New Project
            </router-link>

            <router-link
              to="/admin/messages"
              class="w-full flex items-center justify-center px-4 py-3 bg-[#0d1117] hover:bg-slate-800 text-white border border-[#30363d] font-medium text-sm rounded-lg transition-colors"
            >
              View Inquiries ({{ messagesStore.unreadCount }})
            </router-link>
          </div>
        </div>

        <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
          <h4 class="font-display font-semibold text-xs text-slate-400 uppercase tracking-wider mb-2">Portfolio Overview</h4>
          <p class="text-xs text-slate-300 leading-relaxed">
            Content managed here directly populates the live 3D portfolio sections. Cloudinary URLs are stored automatically upon saving.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProjectsStore } from '../stores/projects'
import { useMessagesStore } from '../stores/messages'

const projectsStore = useProjectsStore()
const messagesStore = useMessagesStore()

onMounted(() => {
  projectsStore.fetchProjects()
  messagesStore.fetchMessages()
})
</script>
