<template>
  <div class="min-h-screen bg-[#0d1117] text-slate-100 flex font-body">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#161b22] border-r border-[#30363d] flex flex-col justify-between shrink-0">
      <div>
        <!-- Brand Header -->
        <div class="p-6 border-b border-[#30363d] flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center font-bold text-black font-display">
              GA
            </div>
            <div>
              <h1 class="font-display font-bold text-sm tracking-wide text-white">Gedoni Admin</h1>
              <p class="text-xs text-slate-400">Portfolio CMS</p>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="p-4 space-y-1">
          <router-link
            to="/admin/dashboard"
            class="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="$route.path === '/admin/dashboard' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Dashboard
          </router-link>

          <router-link
            to="/admin/projects"
            class="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="$route.path.startsWith('/admin/projects') ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Projects
          </router-link>

          <router-link
            to="/admin/messages"
            class="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="$route.path === '/admin/messages' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
              </svg>
              Inquiries
            </div>
            <span v-if="messagesStore.unreadCount > 0" class="bg-sky-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
              {{ messagesStore.unreadCount }}
            </span>
          </router-link>
        </nav>
      </div>

      <!-- Footer User & Return -->
      <div class="p-4 border-t border-[#30363d] space-y-3">
        <router-link to="/" target="_blank" class="flex items-center text-xs text-slate-400 hover:text-sky-400 transition-colors">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          View Live Portfolio
        </router-link>

        <div class="flex items-center justify-between pt-2">
          <div class="flex items-center space-x-2">
            <div class="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
              {{ (authStore.user?.username || 'A')[0].toUpperCase() }}
            </div>
            <span class="text-xs font-medium text-slate-300 truncate max-w-[100px]">
              {{ authStore.user?.username || 'Admin' }}
            </span>
          </div>

          <button @click="handleLogout" class="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors">
            Logout
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <!-- Top header -->
      <header class="h-16 bg-[#161b22] border-b border-[#30363d] px-8 flex items-center justify-between shrink-0">
        <h2 class="text-lg font-display font-semibold text-white">
          {{ pageTitle }}
        </h2>
        <div class="flex items-center space-x-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
            System Live
          </span>
        </div>
      </header>

      <!-- Page Body -->
      <main class="p-8 flex-1">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useMessagesStore } from '../stores/messages'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const messagesStore = useMessagesStore()

const pageTitle = computed(() => {
  if (route.path.includes('/admin/projects')) return 'Projects Management'
  if (route.path.includes('/admin/messages')) return 'Contact Inquiries'
  return 'Dashboard Overview'
})

const handleLogout = () => {
  authStore.logout()
  router.push('/admin/login')
}

onMounted(() => {
  messagesStore.fetchMessages()
})
</script>
