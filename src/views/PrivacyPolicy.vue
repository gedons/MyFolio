<template>
  <div class="min-h-screen bg-background text-text-main font-body py-16 px-6">
    <div class="max-w-3xl mx-auto">
      <router-link to="/" class="inline-flex items-center text-sm text-accent hover:underline mb-8">
        &larr; Back to Portfolio
      </router-link>

      <h1 class="text-4xl font-display font-bold mb-4 text-white">Privacy Policy</h1>
      <p class="text-xs text-text-muted mb-8">Last updated: {{ new Date().toLocaleDateString() }}</p>

      <div class="space-y-6 text-sm text-text-muted leading-relaxed">
        <section>
          <h2 class="text-lg font-display font-semibold text-text-main mb-2">1. Overview</h2>
          <p>
            This portfolio website is operated by Gedoni Ani. This Privacy Policy describes how your information is handled when you use the contact form or visit the site.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-display font-semibold text-text-main mb-2">2. Information Collected</h2>
          <p>
            When you submit a message through the contact form, we collect the details you provide, including your name, email address, and message content. This information is used exclusively to respond to your inquiries and potential collaboration requests.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-display font-semibold text-text-main mb-2">3. Data Retention & Sharing</h2>
          <p>
            Your information is stored securely in our database and will never be sold, rented, or shared with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-display font-semibold text-text-main mb-2">4. Contact</h2>
          <p>
            If you have questions regarding this policy or wish to have your contact form inquiry removed from our records, please reach out via the contact form on the home page.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
