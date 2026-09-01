<template>
  <div class="space-y-6">
    <!-- Header & Filter -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center space-x-2">
        <button
          @click="filter = 'all'"
          class="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
          :class="filter === 'all' ? 'bg-sky-500 text-black font-semibold' : 'bg-slate-800 text-slate-400 hover:text-white'"
        >
          All Inquiries ({{ messagesStore.messages.length }})
        </button>
        <button
          @click="filter = 'unread'"
          class="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
          :class="filter === 'unread' ? 'bg-sky-500 text-black font-semibold' : 'bg-slate-800 text-slate-400 hover:text-white'"
        >
          Unread Only ({{ messagesStore.unreadCount }})
        </button>
      </div>

      <button
        @click="messagesStore.fetchMessages"
        class="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
      >
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        Refresh
      </button>
    </div>

    <!-- Messages List -->
    <div class="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-xl">
      <div class="divide-y divide-[#30363d]">
        <div v-if="messagesStore.loading" class="p-8 text-center text-slate-400 text-sm">
          Loading inquiries...
        </div>

        <div v-else-if="filteredMessages.length === 0" class="p-8 text-center text-slate-400 text-sm">
          No inquiries found.
        </div>

        <div
          v-for="msg in filteredMessages"
          :key="msg._id"
          class="p-5 hover:bg-slate-800/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
          :class="{ 'bg-sky-500/5': !msg.read }"
          @click="openMessage(msg)"
        >
          <div class="flex items-start space-x-4">
            <!-- Read / Unread Indicator -->
            <button
              @click.stop="toggleRead(msg)"
              class="mt-1 w-3 h-3 rounded-full shrink-0 transition-all"
              :class="msg.read ? 'bg-slate-600' : 'bg-sky-400 ring-4 ring-sky-500/20'"
              :title="msg.read ? 'Mark as Unread' : 'Mark as Read'"
            ></button>

            <div>
              <div class="flex items-center space-x-2">
                <h4 class="font-display font-semibold text-white text-sm">
                  {{ msg.firstname }} {{ msg.lastname }}
                </h4>
                <span class="text-xs text-slate-400">&bull; {{ msg.email }}</span>
                <span v-if="!msg.read" class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  NEW
                </span>
              </div>
              <p class="text-xs text-slate-300 mt-1 line-clamp-1 max-w-2xl font-body">{{ msg.message }}</p>
              <p class="text-[10px] text-slate-500 mt-1.5">{{ formatDate(msg.createdAt) }}</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-2 shrink-0 self-end md:self-center" @click.stop>
            <a
              :href="`mailto:${msg.email}?subject=Re: Portfolio Inquiry`"
              class="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-medium transition-colors"
            >
              Reply
            </a>
            <button
              @click="deleteMsg(msg._id)"
              class="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
              title="Delete"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Detail Modal -->
    <div v-if="selectedMsg" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-[#30363d]">
          <div>
            <h3 class="font-display font-bold text-white text-base">
              {{ selectedMsg.firstname }} {{ selectedMsg.lastname }}
            </h3>
            <a :href="`mailto:${selectedMsg.email}`" class="text-xs text-sky-400 hover:underline">
              {{ selectedMsg.email }}
            </a>
          </div>
          <button @click="selectedMsg = null" class="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div class="text-xs text-slate-400">
          Received: {{ formatDate(selectedMsg.createdAt) }}
        </div>

        <div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 text-sm text-slate-200 leading-relaxed font-body whitespace-pre-wrap">
          {{ selectedMsg.message }}
        </div>

        <div class="flex justify-between items-center pt-3 border-t border-[#30363d]">
          <button
            @click="toggleRead(selectedMsg)"
            class="text-xs text-slate-400 hover:text-white"
          >
            {{ selectedMsg.read ? 'Mark as Unread' : 'Mark as Read' }}
          </button>

          <a
            :href="`mailto:${selectedMsg.email}?subject=Re: Portfolio Inquiry`"
            class="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs rounded-lg shadow-lg shadow-sky-500/20"
          >
            Send Email Reply
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMessagesStore } from '../stores/messages'

const messagesStore = useMessagesStore()
const filter = ref('all')
const selectedMsg = ref(null)

const filteredMessages = computed(() => {
  if (filter.value === 'unread') {
    return messagesStore.messages.filter(m => !m.read)
  }
  return messagesStore.messages
})

const openMessage = async (msg) => {
  selectedMsg.value = msg
  if (!msg.read) {
    await messagesStore.toggleRead(msg._id, false)
  }
}

const toggleRead = async (msg) => {
  await messagesStore.toggleRead(msg._id, msg.read)
}

const deleteMsg = async (id) => {
  if (confirm('Delete this message?')) {
    await messagesStore.deleteMessage(id)
    if (selectedMsg.value && selectedMsg.value._id === id) {
      selectedMsg.value = null
    }
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  messagesStore.fetchMessages()
})
</script>
