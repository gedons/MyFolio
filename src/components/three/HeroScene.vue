<template>
  <TresCanvas clear-color="transparent" window-size>
    <TresPerspectiveCamera
      :position="[0, 0, 8]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls 
      :enable-zoom="false" 
      :enable-pan="false" 
      :auto-rotate="true"
      :auto-rotate-speed="1.5"
    />
    
    <HeroModel />
    
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[10, 10, 10]" :intensity="1" />
  </TresCanvas>
</template>

<script setup>
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import HeroModel from './HeroModel.vue'
</script>
