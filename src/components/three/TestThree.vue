<template>
  <div class="h-screen w-full">
    <TresCanvas clear-color="#0a0a0a">
      <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
      <TresMesh>
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh>
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<script setup>
import { TresCanvas } from '@tresjs/core'
</script>
