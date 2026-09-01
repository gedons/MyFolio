<template>
  <section id="contact" class="py-24 px-6 max-w-3xl mx-auto border-t border-surface2">
    <h2 class="text-4xl font-display font-bold mb-8 text-center text-text-main">Get In Touch</h2>
    <form @submit.prevent="submitForm" class="space-y-6">
      <div>
        <label class="block text-text-muted font-body mb-2" for="name">Name</label>
        <input id="name" v-model="form.name" type="text" required class="w-full bg-surface border border-surface2 rounded-md p-3 text-text-main focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" />
      </div>
      <div>
        <label class="block text-text-muted font-body mb-2" for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required class="w-full bg-surface border border-surface2 rounded-md p-3 text-text-main focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" />
      </div>
      <div>
        <label class="block text-text-muted font-body mb-2" for="message">Message</label>
        <textarea id="message" v-model="form.message" rows="5" required class="w-full bg-surface border border-surface2 rounded-md p-3 text-text-main focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"></textarea>
      </div>
      <button type="submit" :disabled="isSubmitting" class="w-full bg-accent text-background font-bold font-body py-4 rounded-md hover:bg-accent-hover transition-colors disabled:opacity-50">
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>
    </form>
    <p v-if="successMsg" class="mt-4 text-green-500 text-center">{{ successMsg }}</p>
    <p v-if="errorMsg" class="mt-4 text-red-500 text-center">{{ errorMsg }}</p>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useMessagesStore } from '../../stores/messages'

const messagesStore = useMessagesStore()
const form = reactive({ firstname: '', lastname: '', email: '', message: '' })
const isSubmitting = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const submitForm = async () => {
  isSubmitting.value = true
  successMsg.value = ''
  errorMsg.value = ''
  
  const result = await messagesStore.sendMessage(form)
  if (result.success) {
    successMsg.value = result.message || 'Thank you! Your message has been sent successfully.'
    form.firstname = ''
    form.lastname = ''
    form.email = ''
    form.message = ''
  } else {
    errorMsg.value = result.error || 'Failed to send message. Please try again.'
  }
  isSubmitting.value = false
}
</script>
