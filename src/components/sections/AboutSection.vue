<template>
  <section id="about" class="py-24 px-6 max-w-7xl mx-auto border-t border-surface2">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <!-- Text Bio -->
      <div class="lg:col-span-7 space-y-6">
        <h2 class="text-4xl md:text-5xl font-display font-bold text-text-main">
          About Gedoni Ani
        </h2>

        <p class="text-lg text-text-muted font-body leading-relaxed">
          I'm a full-stack software engineer and indie maker based in Nigeria. I specialize in building fast, resilient, and engaging web applications from initial architecture through production deployment.
        </p>

        <p class="text-base text-text-muted font-body leading-relaxed">
          Over the past several years, I've built and shipped comprehensive digital solutions spanning e-commerce, fintech, school management systems, crypto exchanges, and 3D web interfaces. I thrive at the intersection of robust backend engineering (Node.js/Express, Python, Go, MongoDB, PostgreSQL) and slick, animated frontend experiences (Vue 3, Three.js, GSAP, Tailwind CSS).
        </p>

        <!-- Quick highlights grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
          <div class="p-4 rounded-xl bg-surface border border-surface2">
            <p class="text-2xl font-bold font-display text-accent">5+ Years</p>
            <p class="text-xs text-text-muted mt-1">Full-Stack Experience</p>
          </div>
          <div class="p-4 rounded-xl bg-surface border border-surface2">
            <p class="text-2xl font-bold font-display text-white">10+ Shipped</p>
            <p class="text-xs text-text-muted mt-1">Production Platforms</p>
          </div>
          <div class="p-4 rounded-xl bg-surface border border-surface2 col-span-2 sm:col-span-1">
            <p class="text-2xl font-bold font-display text-emerald-400">100%</p>
            <p class="text-xs text-text-muted mt-1">Client Satisfaction</p>
          </div>
        </div>
      </div>

      <!-- Image Portrait -->
      <div class="lg:col-span-5 flex justify-center">
        <div class="relative w-full max-w-md group">
          <!-- Ambient Glow Background -->
          <div class="absolute -inset-1 bg-gradient-to-r from-accent to-sky-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-700"></div>
          
          <!-- Image Card -->
          <div class="relative bg-surface rounded-2xl overflow-hidden border border-surface2 shadow-2xl">
            <img
              src="/profile.jpg"
              alt="Gedoni Ani"
              class="w-full h-auto object-cover max-h-[480px] group-hover:scale-105 transition-transform duration-500"
            />
            <!-- Gradient Overlay & Caption -->
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-6 pt-12">
              <p class="text-lg font-display font-bold text-white">Gedoni Ani</p>
              <p class="text-xs text-text-muted">Software Engineer & Founder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
