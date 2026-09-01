<template>
  <section id="contact" class="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Available for full-time roles & high-impact contracts</span>
      </div>
      <h2 class="text-3xl sm:text-5xl font-display font-bold text-text-main">
        Let’s Build Something Exceptional
      </h2>
      <p class="text-text-muted mt-3 text-sm sm:text-base font-body leading-relaxed">
        Have an exciting project, architecture challenge, or collaboration in mind? Reach out directly—my inbox is always open.
      </p>
    </div>

    <!-- Main Direct Contact Card -->
    <div class="relative group">
      <!-- Glow background -->
      <div class="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-blue-600/20 to-cyan-400/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500"></div>

      <div class="relative bg-surface border border-surface2 hover:border-accent/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl transition-all duration-300">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 pb-8 border-b border-surface2/60">
          <div class="space-y-1.5">
            <span class="text-xs font-mono uppercase tracking-widest text-accent font-semibold">Direct Email Channel</span>
            <div class="text-xl sm:text-3xl font-display font-bold text-white tracking-tight break-all">
              {{ email }}
            </div>
            <p class="text-xs sm:text-sm text-text-muted font-body">
              Typical response time: <span class="text-slate-300 font-medium font-mono">&lt; 12 hours</span> &bull; Based in Nigeria (WAT / UTC+1)
            </p>
          </div>

          <!-- Actions: Open Mail Client + Copy to Clipboard -->
          <div class="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <a
              :href="`mailto:${email}?subject=Project%20Inquiry%20-%20Gedoni%20Ani`"
              class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-accent hover:bg-accent-hover text-background font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/40 active:scale-95"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Send Email</span>
            </a>

            <button
              @click="copyEmail"
              class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-surface2 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-mono text-xs font-medium transition-all duration-200 active:scale-95"
            >
              <svg v-if="!copied" class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              <svg v-else class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
            </button>
          </div>
        </div>

        <!-- Social & Professional Fast Connectors -->
        <div class="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- GitHub Link -->
          <a
            href="https://github.com/gedons"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3.5 p-4 rounded-2xl bg-surface2/50 hover:bg-surface2 border border-slate-800/80 hover:border-accent/40 transition-all duration-200 group/link"
          >
            <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 group-hover/link:text-accent group-hover/link:bg-slate-700 transition-colors">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <div>
              <div class="text-xs font-mono font-semibold text-slate-200 group-hover/link:text-accent transition-colors">GitHub</div>
              <div class="text-[11px] text-text-muted font-body">@gedons &bull; Repos & Code</div>
            </div>
          </a>

          <!-- LinkedIn Link -->
          <a
            href="https://linkedin.com/in/gedoniani"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3.5 p-4 rounded-2xl bg-surface2/50 hover:bg-surface2 border border-slate-800/80 hover:border-accent/40 transition-all duration-200 group/link"
          >
            <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 group-hover/link:text-accent group-hover/link:bg-slate-700 transition-colors">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6 0 .88.72 1.6 1.6 1.6.88 0 1.6-.72 1.6-1.6 0-.88-.72-1.6-1.6-1.6Z"/>
              </svg>
            </div>
            <div>
              <div class="text-xs font-mono font-semibold text-slate-200 group-hover/link:text-accent transition-colors">LinkedIn</div>
              <div class="text-[11px] text-text-muted font-body">Professional Network</div>
            </div>
          </a>

          <!-- Location / Availability Hub -->
          <div class="flex items-center gap-3.5 p-4 rounded-2xl bg-surface2/50 border border-slate-800/80">
            <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-accent">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <div class="text-xs font-mono font-semibold text-slate-200">Global Remote</div>
              <div class="text-[11px] text-text-muted font-body">WAT (UTC+1) &bull; Worldwide</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = 'gedoniani@gmail.com'
const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch (err) {
    console.error('Failed to copy email:', err)
  }
}
</script>
