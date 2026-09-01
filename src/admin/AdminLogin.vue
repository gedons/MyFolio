<template>
  <div class="min-h-screen bg-[#0d1117] flex items-center justify-center p-6 font-body">
    <div class="max-w-md w-full bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-2xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-12 h-12 rounded-xl bg-sky-500 mx-auto flex items-center justify-center font-bold text-black font-display text-xl mb-3 shadow-lg shadow-sky-500/20">
          GA
        </div>
        <h1 class="text-2xl font-bold font-display text-white">Portfolio Admin</h1>
        <p class="text-sm text-slate-400 mt-1">Sign in to manage your projects & inquiries</p>
      </div>

      <!-- Alert -->
      <div v-if="error" class="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center">
        <svg class="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        {{ error }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Username / Email</label>
          <input
            v-model="form.username"
            type="text"
            required
            placeholder="admin"
            class="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-sm"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-sm"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-sky-500 hover:bg-sky-400 text-black font-semibold font-display py-3 px-4 rounded-lg transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Authenticating...' : 'Sign In' }}
        </button>
      </form>

      <div class="mt-8 pt-6 border-t border-[#30363d] text-center">
        <router-link to="/" class="text-xs text-slate-400 hover:text-sky-400 transition-colors">
          &larr; Return to Public Portfolio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  const result = await authStore.login(form)
  if (result.success) {
    router.push('/admin/dashboard')
  } else {
    error.value = result.error || 'Invalid credentials'
  }
  loading.value = false
}
</script>
