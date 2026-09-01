<template>
  <div class="relative w-full h-screen overflow-hidden bg-[#040914] select-none touch-none">
    <!-- WebGL Canvas Container -->
    <div
      ref="canvasContainer"
      class="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none"
    ></div>

    <!-- Screen-Space HTML Projected Labels (Track 3D Objects via THREE.Vector3.project) -->
    <div
      v-for="node in nodes"
      :key="node.id"
      class="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-opacity duration-300 z-20 cursor-pointer"
      :style="{
        left: `${node.screenX}px`,
        top: `${node.screenY}px`,
        opacity: node.visible ? 1 : 0,
        pointerEvents: node.visible ? 'auto' : 'none'
      }"
      @click="handleNodeClick(node.id)"
      @mouseenter="handleNodeHover(node.id, true)"
      @mouseleave="handleNodeHover(node.id, false)"
    >
      <div
        class="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 flex items-center space-x-2 shadow-2xl"
        :class="hoveredNodeId === node.id || activeNodeId === node.id ? 'bg-sky-500/20 border-sky-400 text-white scale-110 shadow-sky-500/40' : 'bg-[#0b1326]/85 border-slate-700/80 text-slate-300 hover:border-slate-500'"
      >
        <span class="w-1.5 h-1.5 rounded-full" :class="hoveredNodeId === node.id ? 'bg-sky-400 animate-ping' : 'bg-sky-500'"></span>
        <span class="font-mono font-semibold text-[10px] sm:text-xs uppercase tracking-widest">{{ node.label }}</span>
      </div>
    </div>

    <!-- Header HUD -->
    <header class="absolute top-0 left-0 w-full z-30 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between pointer-events-none">
      <div class="flex items-center space-x-3 pointer-events-auto cursor-pointer" @click="resetCamera">
        <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-500 flex items-center justify-center font-bold text-black font-display text-xs sm:text-sm shadow-lg shadow-sky-500/20">
          GA
        </div>
        <div>
          <h1 class="font-display font-bold text-xs sm:text-sm tracking-wide text-white">Gedoni Ani</h1>
          <p class="text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-tight">Full-Stack Software Engineer</p>
        </div>
      </div>

      <!-- Desktop Nav Pills -->
      <nav class="hidden md:flex items-center space-x-2 pointer-events-auto bg-[#0b1326]/80 backdrop-blur-md border border-slate-800/80 p-1.5 rounded-full shadow-2xl">
        <button
          v-for="btn in navButtons"
          :key="btn.id"
          @click="handleNodeClick(btn.id)"
          class="px-4 py-1.5 rounded-full text-xs font-semibold font-mono uppercase tracking-wider transition-all"
          :class="activeNodeId === btn.id ? 'bg-sky-500 text-black shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'"
        >
          {{ btn.label }}
        </button>
      </nav>

      <!-- Reset View Affordance -->
      <button
        @click="resetCamera"
        class="pointer-events-auto px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-[#0b1326]/80 hover:bg-slate-800 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white transition-all flex items-center space-x-1.5"
        title="Reset 3D Camera"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        <span class="hidden sm:inline">RESET</span>
      </button>
    </header>

    <!-- Mobile Bottom Navigation Bar (Glassmorphic Touch Dock) -->
    <nav class="md:hidden fixed bottom-4 inset-x-4 z-30 pointer-events-auto bg-[#0b1326]/90 backdrop-blur-xl border border-slate-800 px-2 py-2 rounded-2xl flex items-center justify-around shadow-2xl">
      <button
        v-for="btn in navButtons"
        :key="btn.id"
        @click="handleNodeClick(btn.id)"
        class="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all"
        :class="activeNodeId === btn.id ? 'text-sky-400 font-bold bg-sky-500/10' : 'text-slate-400 font-medium'"
      >
        <span class="text-[10px] font-mono uppercase tracking-wider">{{ btn.label }}</span>
      </button>
    </nav>

    <!-- Desktop Bottom Controls Hint -->
    <div class="hidden md:block absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none text-center">
      <div class="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#0b1326]/70 backdrop-blur-md border border-slate-800/80 text-[11px] text-slate-400 font-mono">
        <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
        <span>DRAG TO EXPLORE &bull; CLICK OBJECTS TO NAVIGATE</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, watch } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'

const props = defineProps({
  isOverlayOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select-section'])

const canvasContainer = ref(null)
const hoveredNodeId = ref(null)
const activeNodeId = ref(null)

const navButtons = [
  { id: 'identity', label: 'Identity' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' }
]

const isMobileDevice = () => {
  return window.innerWidth < 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0
}

const getDefaultRadius = () => {
  return isMobileDevice() ? 15.5 : 11
}

// Projected Nodes for HTML Labels
const nodes = reactive([
  { id: 'identity', label: 'Gedoni Ani', position: new THREE.Vector3(0, 0.4, 0), screenX: 0, screenY: 0, visible: true },
  { id: 'work', label: 'Selected Work', position: new THREE.Vector3(-4.4, 0.8, -1.5), screenX: 0, screenY: 0, visible: true },
  { id: 'about', label: 'About Me', position: new THREE.Vector3(4.4, 0.6, -1.2), screenX: 0, screenY: 0, visible: true },
  { id: 'contact', label: 'Get In Touch', position: new THREE.Vector3(0, -2.5, 2.8), screenX: 0, screenY: 0, visible: true },
  { id: 'stack', label: 'Tech Stack', position: new THREE.Vector3(0, 3.2, -2.5), screenX: 0, screenY: 0, visible: true }
])

// Three.js State Variables
let scene, camera, renderer, animationFrameId
let interactiveMeshes = []
let animatedElements = {}
let raycaster, pointer
let isDragging = false
let pointerDirty = false
let isPaused = false
let previousTouchPosition = { x: 0, y: 0 }
let sphericalCoordinates = { radius: getDefaultRadius(), theta: 0, phi: Math.PI / 2.2 }
let targetSpherical = { radius: getDefaultRadius(), theta: 0, phi: Math.PI / 2.2 }
let targetLookAt = new THREE.Vector3(0, 0, 0)
let currentLookAt = new THREE.Vector3(0, 0, 0)
let starsMesh, constellationMesh

const getCameraWaypoints = () => {
  const isMobile = isMobileDevice()
  return {
    identity: { radius: isMobile ? 15.5 : 11, theta: 0, phi: Math.PI / 2.2, lookAt: new THREE.Vector3(0, 0, 0) },
    work: { radius: isMobile ? 10.5 : 7.5, theta: -Math.PI / 3.5, phi: Math.PI / 2.4, lookAt: new THREE.Vector3(-4.4, 0.8, -1.5) },
    about: { radius: isMobile ? 10.5 : 7.5, theta: Math.PI / 3.5, phi: Math.PI / 2.4, lookAt: new THREE.Vector3(4.4, 0.6, -1.2) },
    contact: { radius: isMobile ? 9.5 : 7.0, theta: 0, phi: Math.PI / 1.7, lookAt: new THREE.Vector3(0, -2.5, 2.8) },
    stack: { radius: isMobile ? 10.5 : 7.5, theta: 0, phi: Math.PI / 3.2, lookAt: new THREE.Vector3(0, 3.2, -2.5) }
  }
}

const initThree = () => {
  const container = canvasContainer.value
  if (!container) return

  const width = container.clientWidth || window.innerWidth
  const height = container.clientHeight || window.innerHeight

  // 1. Scene & Deep Atmosphere Fog
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x040914, 0.032)

  // 2. Camera
  const fov = width < 768 ? 58 : 50
  camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100)
  updateCameraPosition()

  // 3. WebGL Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setClearColor(0x040914, 1)
  container.appendChild(renderer.domElement)

  // 4. Balanced Atmospheric Lighting Rig
  const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.6)
  scene.add(ambientLight)

  const keyLight = new THREE.DirectionalLight(0x0ea5e9, 2.2)
  keyLight.position.set(12, 18, 12)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.0)
  fillLight.position.set(-12, -8, -10)
  scene.add(fillLight)

  const rimLight = new THREE.PointLight(0x0284c7, 2.5, 25)
  rimLight.position.set(0, 0, 0)
  scene.add(rimLight)

  // 5. Build Spec-Accurate Objects
  buildObjects()

  // 6. Atmospheric Background (Parallax Stars, Constellation Lines, Faint Nebula Glow)
  buildAtmosphere()

  // 7. Raycaster
  raycaster = new THREE.Raycaster()
  pointer = new THREE.Vector2(-1000, -1000)

  // 8. Event Listeners
  window.addEventListener('resize', onWindowResize, { passive: true })
  container.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerup', onPointerUp)
  container.addEventListener('wheel', onWheel, { passive: true })
  container.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('touchend', onTouchEnd)
  document.addEventListener('visibilitychange', onVisibilityChange)

  // 9. Start Render Loop
  animate()
}

const buildObjects = () => {
  // 1. Centerpiece / Identity: Pulsing Diamond Core inside Wireframe Sphere + Orbit Ring
  const centerGroup = new THREE.Group()
  
  // Wireframe sphere outer shell
  const sphereGeom = new THREE.SphereGeometry(1.6, 16, 16)
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0x0ea5e9,
    wireframe: true,
    roughness: 0.1,
    metalness: 0.9,
    emissive: 0x0284c7,
    emissiveIntensity: 0.3
  })
  const centerSphere = new THREE.Mesh(sphereGeom, sphereMat)
  centerSphere.userData = { id: 'identity', baseScale: 1 }
  centerGroup.add(centerSphere)
  interactiveMeshes.push(centerSphere)

  // Diamond Core (pulsing live heart)
  const diamondGeom = new THREE.OctahedronGeometry(0.85, 0)
  const diamondMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.7,
    roughness: 0.15,
    metalness: 0.8
  })
  const diamondMesh = new THREE.Mesh(diamondGeom, diamondMat)
  centerGroup.add(diamondMesh)
  animatedElements.identityDiamond = diamondMesh

  // Orbit ring
  const orbitRingGeom = new THREE.TorusGeometry(2.4, 0.025, 8, 48)
  const orbitRingMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0ea5e9, emissiveIntensity: 0.35 })
  const orbitRing = new THREE.Mesh(orbitRingGeom, orbitRingMat)
  orbitRing.rotation.x = Math.PI / 3
  centerGroup.add(orbitRing)
  animatedElements.identityRing = orbitRing

  scene.add(centerGroup)
  animatedElements.centerGroup = centerGroup

  // 2. Selected Work: Cluster of Distinct Low-Poly Shapes ("Collection of distinct built things")
  const workGroup = new THREE.Group()
  workGroup.position.set(-4.4, 0.8, -1.5)

  // Shape A: Cube
  const cubeMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x0ea5e9, wireframe: true, metalness: 0.8, roughness: 0.2, emissive: 0x0284c7, emissiveIntensity: 0.3 })
  )
  cubeMesh.position.set(-0.4, 0.3, 0)
  cubeMesh.userData = { id: 'work' }
  workGroup.add(cubeMesh)
  interactiveMeshes.push(cubeMesh)

  // Shape B: Tetrahedron
  const tetraMesh = new THREE.Mesh(
    new THREE.TetrahedronGeometry(0.7, 0),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, wireframe: false, metalness: 0.9, roughness: 0.1, emissive: 0x0369a1, emissiveIntensity: 0.5 })
  )
  tetraMesh.position.set(0.5, -0.2, 0.2)
  tetraMesh.userData = { id: 'work' }
  workGroup.add(tetraMesh)
  interactiveMeshes.push(tetraMesh)

  // Shape C: Prism / Hexagonal cylinder
  const prismMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.9, 6),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, wireframe: true, emissive: 0x0ea5e9, emissiveIntensity: 0.3 })
  )
  prismMesh.position.set(0, -0.4, -0.4)
  prismMesh.userData = { id: 'work' }
  workGroup.add(prismMesh)
  interactiveMeshes.push(prismMesh)

  scene.add(workGroup)
  animatedElements.workGroup = workGroup

  // 3. About Me: Outer Wireframe Shell with Solid Faceted Core ("Public shell vs Person underneath")
  const aboutGroup = new THREE.Group()
  aboutGroup.position.set(4.4, 0.6, -1.2)

  // Outer wireframe shell
  const aboutShell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.2, 0),
    new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2
    })
  )
  aboutShell.userData = { id: 'about' }
  aboutGroup.add(aboutShell)
  interactiveMeshes.push(aboutShell)

  // Solid Faceted Inner Core
  const aboutCore = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.65, 0),
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.65
    })
  )
  aboutGroup.add(aboutCore)
  animatedElements.aboutCore = aboutCore

  scene.add(aboutGroup)
  animatedElements.aboutGroup = aboutGroup

  // 4. Tech Stack: Torus Knot with Glowing Tech Nodes ("Interconnected Technologies")
  const stackGroup = new THREE.Group()
  stackGroup.position.set(0, 3.2, -2.5)

  const knotGeom = new THREE.TorusKnotGeometry(0.9, 0.2, 48, 8)
  const knotMat = new THREE.MeshStandardMaterial({
    color: 0x0ea5e9,
    metalness: 0.85,
    roughness: 0.2,
    emissive: 0x0369a1,
    emissiveIntensity: 0.35,
    wireframe: true
  })
  const knotMesh = new THREE.Mesh(knotGeom, knotMat)
  knotMesh.userData = { id: 'stack' }
  stackGroup.add(knotMesh)
  interactiveMeshes.push(knotMesh)

  // Place 5 glowing nodes along the knot path
  const techNodesGroup = new THREE.Group()
  const nodeCount = 6
  for (let i = 0; i < nodeCount; i++) {
    const u = (i / nodeCount) * Math.PI * 2
    const p = 2, q = 3
    const r = 0.9
    const x = r * (2 + Math.cos(q * u)) * 0.5 * Math.cos(p * u)
    const y = r * (2 + Math.cos(q * u)) * 0.5 * Math.sin(p * u)
    const z = r * Math.sin(q * u) * 0.5

    const techNode = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0x7dd3fc, emissive: 0x38bdf8, emissiveIntensity: 0.9 })
    )
    techNode.position.set(x, y, z)
    techNodesGroup.add(techNode)
  }
  stackGroup.add(techNodesGroup)
  animatedElements.stackNodes = techNodesGroup

  scene.add(stackGroup)
  animatedElements.stackGroup = stackGroup

  // 5. Get in Touch: Wireframe Sphere with Expanding/Pulsing Signal Ring ("Broadcasting a Signal")
  const contactGroup = new THREE.Group()
  contactGroup.position.set(0, -2.5, 2.8)

  const contactMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.0, 14, 14),
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4
    })
  )
  contactMesh.userData = { id: 'contact' }
  contactGroup.add(contactMesh)
  interactiveMeshes.push(contactMesh)

  // Emitting pulse ring
  const signalRingGeom = new THREE.RingGeometry(1.1, 1.15, 32)
  const signalRingMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  })
  const signalRing = new THREE.Mesh(signalRingGeom, signalRingMat)
  signalRing.rotation.x = Math.PI / 2
  contactGroup.add(signalRing)
  animatedElements.contactSignalRing = signalRing

  scene.add(contactGroup)
  animatedElements.contactGroup = contactGroup
}

const buildAtmosphere = () => {
  // 1. Depth-Varied Parallax Stars
  const starCount = 450
  const positions = new Float32Array(starCount * 3)
  const colors = new Float32Array(starCount * 3)

  const color1 = new THREE.Color(0x0ea5e9)
  const color2 = new THREE.Color(0xdbeafe)

  for (let i = 0; i < starCount; i++) {
    const r = 6 + Math.random() * 22
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)

    const mixedColor = color1.clone().lerp(color2, Math.random())
    colors[i * 3] = mixedColor.r
    colors[i * 3 + 1] = mixedColor.g
    colors[i * 3 + 2] = mixedColor.b
  }

  const starGeom = new THREE.BufferGeometry()
  starGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  starGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const starMat = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.65
  })

  starsMesh = new THREE.Points(starGeom, starMat)
  scene.add(starsMesh)

  // 2. Faint Distant Constellation Lines
  const linePositions = []
  for (let i = 0; i < 20; i++) {
    const idx1 = Math.floor(Math.random() * starCount) * 3
    const idx2 = Math.floor(Math.random() * starCount) * 3
    linePositions.push(
      positions[idx1], positions[idx1 + 1], positions[idx1 + 2],
      positions[idx2], positions[idx2 + 1], positions[idx2 + 2]
    )
  }
  const lineGeom = new THREE.BufferGeometry()
  lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
  const lineMat = new THREE.LineBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.15 })
  const linesMesh = new THREE.LineSegments(lineGeom, lineMat)
  scene.add(linesMesh)
  constellationMesh = linesMesh

  // 3. Faint Distant Background Nebula Glow
  const glowGeom = new THREE.PlaneGeometry(35, 35)
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(14, 165, 233, 0.12)')
  grad.addColorStop(0.6, 'rgba(2, 132, 199, 0.03)')
  grad.addColorStop(1, 'rgba(4, 9, 20, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 128)

  const texture = new THREE.CanvasTexture(canvas)
  const glowMat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false
  })
  const glowMesh = new THREE.Mesh(glowGeom, glowMat)
  glowMesh.position.set(0, 0, -28)
  scene.add(glowMesh)
}

const updateCameraPosition = () => {
  const x = targetSpherical.radius * Math.sin(targetSpherical.phi) * Math.sin(targetSpherical.theta)
  const y = targetSpherical.radius * Math.cos(targetSpherical.phi)
  const z = targetSpherical.radius * Math.sin(targetSpherical.phi) * Math.cos(targetSpherical.theta)

  camera.position.set(x, y, z)
  camera.lookAt(currentLookAt)
}

const updateProjectedLabels = () => {
  if (!containerDimensions) return
  const { width, height } = containerDimensions

  nodes.forEach(node => {
    const pos = node.position.clone()
    pos.project(camera)

    const isBehind = pos.z > 1
    node.visible = !isBehind
    const margin = 35
    const rawX = (pos.x * 0.5 + 0.5) * width
    const rawY = (-(pos.y * 0.5) + 0.5) * height

    node.screenX = Math.max(margin, Math.min(width - margin, rawX))
    node.screenY = Math.max(margin + 20, Math.min(height - margin - 40, rawY))
  })
}

let containerDimensions = null

const onWindowResize = () => {
  if (!canvasContainer.value || !renderer || !camera) return
  const width = canvasContainer.value.clientWidth || window.innerWidth
  const height = canvasContainer.value.clientHeight || window.innerHeight

  camera.fov = width < 768 ? 58 : 50
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  containerDimensions = { width, height }

  if (!activeNodeId.value || activeNodeId.value === 'identity') {
    targetSpherical.radius = getDefaultRadius()
  }
}

const onVisibilityChange = () => {
  isPaused = document.hidden
}

watch(() => props.isOverlayOpen, (open) => {
  if (!open) {
    isPaused = false
    pointerDirty = true
    resetCamera()
  } else {
    setTimeout(() => {
      if (props.isOverlayOpen) {
        isPaused = true
      }
    }, 1500)
  }
})

// Desktop Pointer Controls
const onPointerDown = (e) => {
  isDragging = true
  previousTouchPosition = { x: e.clientX, y: e.clientY }
}

const onPointerMove = (e) => {
  if (!canvasContainer.value) return
  const rect = canvasContainer.value.getBoundingClientRect()
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  pointerDirty = true

  if (isDragging) {
    const deltaX = e.clientX - previousTouchPosition.x
    const deltaY = e.clientY - previousTouchPosition.y

    targetSpherical.theta -= deltaX * 0.005
    targetSpherical.phi = Math.max(0.3, Math.min(Math.PI - 0.3, targetSpherical.phi - deltaY * 0.005))

    previousTouchPosition = { x: e.clientX, y: e.clientY }
  }
}

const onPointerUp = () => {
  if (isDragging) {
    isDragging = false
  }
  raycastClick()
}

// Mobile Touch Controls
const onTouchStart = (e) => {
  if (e.touches.length === 1) {
    isDragging = true
    previousTouchPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    
    if (canvasContainer.value) {
      const rect = canvasContainer.value.getBoundingClientRect()
      pointer.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1
      pointerDirty = true
    }
  }
}

const onTouchMove = (e) => {
  if (isDragging && e.touches.length === 1) {
    const deltaX = e.touches[0].clientX - previousTouchPosition.x
    const deltaY = e.touches[0].clientY - previousTouchPosition.y

    targetSpherical.theta -= deltaX * 0.006
    targetSpherical.phi = Math.max(0.3, Math.min(Math.PI - 0.3, targetSpherical.phi - deltaY * 0.006))

    previousTouchPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
}

const onTouchEnd = () => {
  if (isDragging) {
    isDragging = false
  }
  raycastClick()
}

const onWheel = (e) => {
  targetSpherical.radius = Math.max(5, Math.min(22, targetSpherical.radius + e.deltaY * 0.01))
}

const raycastClick = () => {
  if (!raycaster || !camera) return
  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(interactiveMeshes, false)

  if (intersects.length > 0) {
    const mesh = intersects[0].object
    const id = mesh.userData.id
    if (id) {
      handleNodeClick(id)
    }
  }
}

const handleNodeClick = (id) => {
  activeNodeId.value = id
  const waypoints = getCameraWaypoints()
  const waypoint = waypoints[id] || waypoints.identity

  gsap.to(targetSpherical, {
    radius: waypoint.radius,
    theta: waypoint.theta,
    phi: waypoint.phi,
    duration: 1.2,
    ease: 'power2.inOut'
  })

  gsap.to(currentLookAt, {
    x: waypoint.lookAt.x,
    y: waypoint.lookAt.y,
    z: waypoint.lookAt.z,
    duration: 1.2,
    ease: 'power2.inOut'
  })

  emit('select-section', id)
}

const handleNodeHover = (id, isHovered) => {
  hoveredNodeId.value = isHovered ? id : null
  const mesh = interactiveMeshes.find(m => m.userData.id === id)
  if (mesh) {
    gsap.to(mesh.scale, {
      x: isHovered ? 1.2 : 1,
      y: isHovered ? 1.2 : 1,
      z: isHovered ? 1.2 : 1,
      duration: 0.25
    })
  }
}

const resetCamera = () => {
  handleNodeClick('identity')
}

// Animation Loop with Living Behavior
let clock = new THREE.Clock()

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  if (isPaused) return

  const elapsed = clock.getElapsedTime()

  if (pointerDirty && raycaster && camera) {
    raycaster.setFromCamera(pointer, camera)
    const intersects = raycaster.intersectObjects(interactiveMeshes, false)
    if (intersects.length > 0) {
      const id = intersects[0].object.userData.id
      if (hoveredNodeId.value !== id) {
        handleNodeHover(id, true)
      }
    } else if (hoveredNodeId.value && !isDragging) {
      handleNodeHover(hoveredNodeId.value, false)
    }
    pointerDirty = false
  }

  // Smooth camera position interpolation
  sphericalCoordinates.radius += (targetSpherical.radius - sphericalCoordinates.radius) * 0.08
  sphericalCoordinates.theta += (targetSpherical.theta - sphericalCoordinates.theta) * 0.08
  sphericalCoordinates.phi += (targetSpherical.phi - sphericalCoordinates.phi) * 0.08

  const x = sphericalCoordinates.radius * Math.sin(sphericalCoordinates.phi) * Math.sin(sphericalCoordinates.theta)
  const y = sphericalCoordinates.radius * Math.cos(sphericalCoordinates.phi)
  const z = sphericalCoordinates.radius * Math.sin(sphericalCoordinates.phi) * Math.cos(sphericalCoordinates.theta)

  camera.position.set(x, y, z)
  camera.lookAt(currentLookAt)

  // 1. Identity Alive Heart Pulse
  if (animatedElements.identityDiamond) {
    const pulse = 1 + Math.sin(elapsed * 2.2) * 0.08
    animatedElements.identityDiamond.scale.set(pulse, pulse, pulse)
    animatedElements.identityDiamond.material.emissiveIntensity = 0.7 + Math.sin(elapsed * 2.2) * 0.25
    animatedElements.identityDiamond.rotation.y -= 0.015
  }

  if (animatedElements.centerGroup) {
    animatedElements.centerGroup.rotation.y += 0.004
  }

  if (animatedElements.identityRing) {
    animatedElements.identityRing.rotation.z += 0.01
  }

  // 2. Selected Work Cluster Rotation
  if (animatedElements.workGroup) {
    animatedElements.workGroup.rotation.y += 0.008
    animatedElements.workGroup.rotation.x = Math.sin(elapsed * 0.8) * 0.15
  }

  // 3. About Core Counter-rotation
  if (animatedElements.aboutGroup) {
    animatedElements.aboutGroup.rotation.y += 0.006
    if (animatedElements.aboutCore) {
      animatedElements.aboutCore.rotation.y -= 0.012
      animatedElements.aboutCore.rotation.z += 0.008
    }
  }

  // 4. Tech Stack Knot Rotation & Orbit
  if (animatedElements.stackGroup) {
    animatedElements.stackGroup.rotation.y += 0.007
    animatedElements.stackGroup.rotation.x += 0.004
  }

  // 5. Contact Signal Pulse (Expanding Radio Waves)
  if (animatedElements.contactSignalRing) {
    const pulseCycle = (elapsed * 1.2) % 2
    const ringScale = 1 + pulseCycle * 0.8
    animatedElements.contactSignalRing.scale.set(ringScale, ringScale, ringScale)
    animatedElements.contactSignalRing.material.opacity = Math.max(0, 0.8 - (pulseCycle / 2) * 0.8)
  }

  if (animatedElements.contactGroup) {
    animatedElements.contactGroup.rotation.y += 0.005
  }

  // 6. Background Slow Drift
  if (starsMesh) {
    starsMesh.rotation.y -= 0.0003
  }
  if (constellationMesh) {
    constellationMesh.rotation.y -= 0.0003
  }

  updateProjectedLabels()

  renderer.render(scene, camera)
}

onMounted(() => {
  containerDimensions = {
    width: canvasContainer.value?.clientWidth || window.innerWidth,
    height: canvasContainer.value?.clientHeight || window.innerHeight
  }
  initThree()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
  document.removeEventListener('visibilitychange', onVisibilityChange)

  if (scene) {
    scene.traverse((child) => {
      if (child.isMesh || child.isPoints || child.isLineSegments) {
        if (child.geometry) child.geometry.dispose()
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose())
          } else {
            child.material.dispose()
          }
        }
      }
    })
  }

  if (renderer) {
    renderer.dispose()
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }
})
</script>
