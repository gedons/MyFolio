<template>
  <TresGroup ref="groupRef">
    <!-- Center Core: Wireframe Icosahedron -->
    <TresMesh ref="coreRef" :position="[0, 0, 0]">
      <TresIcosahedronGeometry :args="[1.8, 1]" />
      <TresMeshStandardMaterial 
        color="#0ea5e9"
        :wireframe="true"
        :transparent="true"
        :opacity="0.85"
        :roughness="0.2"
        :metalness="0.8"
      />
    </TresMesh>

    <!-- Inner Solid Glowing Nucleus -->
    <TresMesh ref="innerRef" :position="[0, 0, 0]">
      <TresOctahedronGeometry :args="[0.9, 0]" />
      <TresMeshStandardMaterial 
        color="#38bdf8"
        :wireframe="false"
        :emissive="'#0284c7'"
        :emissive-intensity="0.6"
        :roughness="0.1"
      />
    </TresMesh>

    <!-- Outer Gyro Ring 1 (X-axis dominant) -->
    <TresMesh ref="ring1Ref" :rotation="[Math.PI / 4, 0, 0]">
      <TresTorusGeometry :args="[2.8, 0.03, 16, 100]" />
      <TresMeshStandardMaterial 
        color="#0ea5e9"
        :emissive="'#0ea5e9'"
        :emissive-intensity="0.4"
        :transparent="true"
        :opacity="0.7"
      />
    </TresMesh>

    <!-- Outer Gyro Ring 2 (Y-axis dominant) -->
    <TresMesh ref="ring2Ref" :rotation="[0, Math.PI / 3, Math.PI / 6]">
      <TresTorusGeometry :args="[3.3, 0.02, 16, 100]" />
      <TresMeshStandardMaterial 
        color="#38bdf8"
        :emissive="'#38bdf8'"
        :emissive-intensity="0.3"
        :transparent="true"
        :opacity="0.6"
      />
    </TresMesh>

    <!-- Orbiting Satellite 1 -->
    <TresMesh ref="satellite1Ref">
      <TresTetrahedronGeometry :args="[0.3, 0]" />
      <TresMeshStandardMaterial 
        color="#7dd3fc"
        :wireframe="true"
        :emissive="'#0ea5e9'"
      />
    </TresMesh>

    <!-- Orbiting Satellite 2 -->
    <TresMesh ref="satellite2Ref">
      <TresOctahedronGeometry :args="[0.25, 0]" />
      <TresMeshStandardMaterial 
        color="#38bdf8"
        :wireframe="true"
        :emissive="'#38bdf8'"
      />
    </TresMesh>
  </TresGroup>
</template>

<script setup>
import { shallowRef, onMounted, onUnmounted } from 'vue'
import { useLoop } from '@tresjs/core'

const groupRef = shallowRef(null)
const coreRef = shallowRef(null)
const innerRef = shallowRef(null)
const ring1Ref = shallowRef(null)
const ring2Ref = shallowRef(null)
const satellite1Ref = shallowRef(null)
const satellite2Ref = shallowRef(null)

// Mouse parallax tracking
let mouseX = 0
let mouseY = 0
let targetRotationX = 0
let targetRotationY = 0

const handleMouseMove = (e) => {
  const { innerWidth, innerHeight } = window
  mouseX = (e.clientX / innerWidth - 0.5) * 2
  mouseY = (e.clientY / innerHeight - 0.5) * 2
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  const d = delta || 0.016
  const time = elapsed || Date.now() * 0.001

  // Smooth mouse tilt interpolation
  targetRotationY += (mouseX * 0.8 - targetRotationY) * 0.05
  targetRotationX += (mouseY * 0.8 - targetRotationX) * 0.05

  if (groupRef.value) {
    groupRef.value.rotation.y = targetRotationY
    groupRef.value.rotation.x = targetRotationX
    // Overall subtle floating oscillation
    groupRef.value.position.y = Math.sin(time * 1.2) * 0.25
  }

  // Core counter-rotation
  if (coreRef.value) {
    coreRef.value.rotation.y += d * 0.35
    coreRef.value.rotation.x += d * 0.2
  }

  // Inner nucleus faster rotation
  if (innerRef.value) {
    innerRef.value.rotation.y -= d * 0.6
    innerRef.value.rotation.z += d * 0.4
  }

  // Gyroscopic outer rings spinning
  if (ring1Ref.value) {
    ring1Ref.value.rotation.x += d * 0.4
    ring1Ref.value.rotation.z += d * 0.25
  }

  if (ring2Ref.value) {
    ring2Ref.value.rotation.y += d * 0.3
    ring2Ref.value.rotation.x -= d * 0.2
  }

  // Orbiting Satellites
  if (satellite1Ref.value) {
    const r1 = 3.6
    satellite1Ref.value.position.x = Math.cos(time * 0.9) * r1
    satellite1Ref.value.position.z = Math.sin(time * 0.9) * r1
    satellite1Ref.value.position.y = Math.sin(time * 1.5) * 1.2
    satellite1Ref.value.rotation.x += d * 2
    satellite1Ref.value.rotation.y += d * 2
  }

  if (satellite2Ref.value) {
    const r2 = 4.2
    satellite2Ref.value.position.x = Math.sin(time * 0.7 + 2) * r2
    satellite2Ref.value.position.z = Math.cos(time * 0.7 + 2) * r2
    satellite2Ref.value.position.y = Math.cos(time * 1.1) * 1.5
    satellite2Ref.value.rotation.y += d * 3
  }
})
</script>
