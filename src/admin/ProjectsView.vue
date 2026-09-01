<template>
  <div class="space-y-6">
    <!-- Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="relative flex-1 max-w-md">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search projects by title or stack..."
          class="w-full bg-[#161b22] border border-[#30363d] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
        />
        <svg class="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>

      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-black font-semibold text-sm rounded-lg transition-all shadow-lg shadow-sky-500/20 font-display shrink-0"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add New Project
      </button>
    </div>

    <!-- Alert / Status -->
    <div v-if="statusMsg" class="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center justify-between">
      <span>{{ statusMsg }}</span>
      <button @click="statusMsg = ''" class="text-emerald-400 hover:text-white">&times;</button>
    </div>

    <!-- Projects Table -->
    <div class="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-300">
          <thead class="bg-[#0d1117] text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-[#30363d]">
            <tr>
              <th class="px-6 py-4">Order</th>
              <th class="px-6 py-4">Project</th>
              <th class="px-6 py-4">Tech Stack</th>
              <th class="px-6 py-4 text-center">Featured</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#30363d]">
            <tr v-if="projectsStore.loading">
              <td colspan="5" class="px-6 py-12 text-center text-slate-400">Loading projects...</td>
            </tr>
            <tr v-else-if="filteredProjects.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-slate-400">No projects found.</td>
            </tr>
            <tr
              v-for="(project, index) in filteredProjects"
              :key="project._id"
              class="hover:bg-slate-800/30 transition-colors"
            >
              <!-- Order controls -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-1">
                  <button
                    @click="moveProject(index, -1)"
                    :disabled="index === 0"
                    class="p-1 text-slate-500 hover:text-white disabled:opacity-20 disabled:hover:text-slate-500"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <span class="text-xs font-mono text-slate-400 w-4 text-center">{{ project.displayOrder ?? index }}</span>
                  <button
                    @click="moveProject(index, 1)"
                    :disabled="index === filteredProjects.length - 1"
                    class="p-1 text-slate-500 hover:text-white disabled:opacity-20 disabled:hover:text-slate-500"
                    title="Move Down"
                  >
                    ▼
                  </button>
                </div>
              </td>

              <!-- Project Title & Image -->
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                    <img
                      v-if="project.coverImage || project.imageUrl"
                      :src="project.coverImage || project.imageUrl"
                      :alt="project.title"
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center text-xs text-slate-500 font-bold font-display">
                      {{ project.title ? project.title[0] : 'P' }}
                    </div>
                  </div>
                  <div>
                    <h4 class="font-display font-semibold text-white text-base">{{ project.title }}</h4>
                    <p class="text-xs text-slate-400 line-clamp-1 max-w-sm">{{ project.description }}</p>
                    <a v-if="project.url" :href="project.url" target="_blank" class="text-xs text-sky-400 hover:underline">
                      {{ project.url.replace(/^https?:\/\//, '') }}
                    </a>
                  </div>
                </div>
              </td>

              <!-- Tech Stack Badges -->
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1 max-w-xs">
                  <span
                    v-for="tag in (project.stackTags || [])"
                    :key="tag"
                    class="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {{ tag }}
                  </span>
                  <span v-if="!project.stackTags || project.stackTags.length === 0" class="text-xs text-slate-500">None</span>
                </div>
              </td>

              <!-- Inline Featured Switch -->
              <td class="px-6 py-4 text-center">
                <button
                  @click="handleToggleFeatured(project._id)"
                  class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  :class="project.featured ? 'bg-sky-500' : 'bg-slate-700'"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    :class="project.featured ? 'translate-x-5' : 'translate-x-0'"
                  />
                </button>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right whitespace-nowrap space-x-2">
                <button
                  @click="openEditModal(project)"
                  class="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  @click="confirmDelete(project)"
                  class="px-3 py-1.5 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium border border-rose-500/20 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create / Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex items-center justify-between pb-4 border-b border-[#30363d] mb-6">
          <h3 class="text-lg font-display font-bold text-white">
            {{ isEditing ? 'Edit Project' : 'Create New Project' }}
          </h3>
          <button @click="showModal = false" class="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <form @submit.prevent="saveProject" class="space-y-5">
          <!-- Title -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Project Title *</label>
            <input
              v-model="form.title"
              type="text"
              required
              placeholder="e.g. Savor by Orido"
              class="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-500 outline-none text-sm"
            />
          </div>

          <!-- One-line Description -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Short Tagline / Description *</label>
            <input
              v-model="form.description"
              type="text"
              required
              placeholder="e.g. E-Commerce platform for modern retail"
              class="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-500 outline-none text-sm"
            />
          </div>

          <!-- Cover Image File Upload & URL (Cloudinary) -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Project Cover Image (Upload or Cloudinary URL)
            </label>

            <!-- Drag and drop / file upload box -->
            <div
              class="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors relative"
              :class="isDraggingFile ? 'border-sky-500 bg-sky-500/10' : 'border-[#30363d] hover:border-slate-500 bg-[#0d1117]'"
              @dragover.prevent="isDraggingFile = true"
              @dragleave.prevent="isDraggingFile = false"
              @drop.prevent="handleFileDrop"
              @click="triggerFileInput"
            >
              <input
                ref="fileInputRef"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileSelect"
              />

              <div v-if="uploadingImage" class="py-4 flex flex-col items-center">
                <div class="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p class="text-xs text-sky-400 font-semibold">Uploading image to Cloudinary...</p>
              </div>

              <div v-else-if="form.coverImage" class="space-y-3">
                <div class="relative w-full h-44 bg-slate-900 rounded-lg overflow-hidden border border-slate-700 group">
                  <img :src="form.coverImage" alt="Preview" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                    <span class="text-xs text-white bg-slate-800 px-3 py-1.5 rounded-md">Click to Replace</span>
                    <button
                      type="button"
                      @click.stop="form.coverImage = ''"
                      class="text-xs text-rose-400 bg-rose-500/20 px-3 py-1.5 rounded-md hover:bg-rose-500/40"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p class="text-[11px] text-slate-400 break-all font-mono">{{ form.coverImage }}</p>
              </div>

              <div v-else class="py-4 flex flex-col items-center">
                <svg class="w-10 h-10 text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p class="text-sm font-medium text-slate-200">
                  <span class="text-sky-400 underline">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-slate-500 mt-1">PNG, JPG, WebP up to 10MB (Stored securely on Cloudinary)</p>
              </div>
            </div>

            <!-- Manual URL override option -->
            <div class="mt-3 flex items-center gap-2">
              <input
                v-model="form.coverImage"
                type="url"
                placeholder="Or paste external image URL..."
                class="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-sky-500 outline-none text-xs"
              />
            </div>
          </div>

          <!-- Tech Stack Tags -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tech Stack Tags</label>
            <div class="flex gap-2 mb-2">
              <input
                v-model="newTag"
                @keydown.enter.prevent="addTag"
                type="text"
                placeholder="Type tag (e.g. Vue 3, Go, Node.js) and press Enter"
                class="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-sky-500 outline-none text-sm"
              />
              <button
                type="button"
                @click="addTag"
                class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg"
              >
                Add
              </button>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="(tag, index) in form.stackTags"
                :key="tag"
                class="inline-flex items-center px-2.5 py-1 rounded bg-slate-800 text-slate-200 text-xs border border-slate-700"
              >
                {{ tag }}
                <button type="button" @click="removeTag(index)" class="ml-1.5 text-slate-400 hover:text-rose-400">&times;</button>
              </span>
            </div>
          </div>

          <!-- Live URL & GitHub URL -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Live Demo URL</label>
              <input
                v-model="form.url"
                type="url"
                placeholder="https://example.com"
                class="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-500 outline-none text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">GitHub Repository URL</label>
              <input
                v-model="form.githubUrl"
                type="url"
                placeholder="https://github.com/gedons/..."
                class="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-500 outline-none text-sm"
              />
            </div>
          </div>

          <!-- Case Study Long Form -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Case Study (Deep Dive)</label>
            <textarea
              v-model="form.caseStudy"
              rows="5"
              placeholder="Describe the problem, architectural approach, technical decisions, and final outcome..."
              class="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-4 text-white placeholder-slate-500 focus:border-sky-500 outline-none text-sm font-mono"
            ></textarea>
          </div>

          <!-- Featured Checkbox & Display Order -->
          <div class="flex items-center justify-between p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <label class="flex items-center space-x-3 cursor-pointer">
              <input
                v-model="form.featured"
                type="checkbox"
                class="w-4 h-4 rounded text-sky-500 focus:ring-sky-500 bg-slate-900 border-slate-700"
              />
              <span class="text-sm font-medium text-white">Feature on Landing Page</span>
            </label>

            <div class="flex items-center space-x-2">
              <label class="text-xs font-semibold text-slate-400 uppercase">Order:</label>
              <input
                v-model.number="form.displayOrder"
                type="number"
                class="w-16 bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-center text-white text-sm"
              />
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-[#30363d]">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving || uploadingImage"
              class="px-6 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black text-sm font-semibold font-display shadow-lg shadow-sky-500/20 disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : (isEditing ? 'Update Project' : 'Publish Project') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="projectToDelete" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl max-w-md w-full p-6 shadow-2xl">
        <h3 class="text-lg font-display font-bold text-white mb-2">Delete Project?</h3>
        <p class="text-sm text-slate-400 mb-6">
          Are you sure you want to delete <span class="text-white font-semibold">"{{ projectToDelete.title }}"</span>? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="projectToDelete = null"
            class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            @click="executeDelete"
            class="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useProjectsStore } from '../stores/projects'
import api from '../services/api'

const projectsStore = useProjectsStore()

const searchQuery = ref('')
const statusMsg = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const uploadingImage = ref(false)
const isDraggingFile = ref(false)
const fileInputRef = ref(null)
const projectToDelete = ref(null)
const editingId = ref(null)
const newTag = ref('')

const form = reactive({
  title: '',
  description: '',
  caseStudy: '',
  coverImage: '',
  stackTags: [],
  url: '',
  githubUrl: '',
  featured: false,
  displayOrder: 0
})

const filteredProjects = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  const list = [...projectsStore.projects].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  if (!query) return list
  return list.filter(p =>
    p.title?.toLowerCase().includes(query) ||
    p.description?.toLowerCase().includes(query) ||
    p.stackTags?.some(t => t.toLowerCase().includes(query))
  )
})

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileSelect = (e) => {
  const files = e.target.files
  if (files && files[0]) {
    uploadFile(files[0])
  }
}

const handleFileDrop = (e) => {
  isDraggingFile.value = false
  const files = e.dataTransfer.files
  if (files && files[0]) {
    uploadFile(files[0])
  }
}

const uploadFile = async (file) => {
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file (PNG, JPG, WebP).')
    return
  }

  uploadingImage.value = true
  const formData = new FormData()
  formData.append('image', file)

  try {
    const res = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (res.data && res.data.url) {
      form.coverImage = res.data.url
    }
  } catch (err) {
    console.error('Image upload failed:', err)
    alert(err.response?.data?.error || err.response?.data?.message || 'Image upload failed. Check connection or file size.')
  } finally {
    uploadingImage.value = false
  }
}

const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !form.stackTags.includes(tag)) {
    form.stackTags.push(tag)
  }
  newTag.value = ''
}

const removeTag = (index) => {
  form.stackTags.splice(index, 1)
}

const openCreateModal = () => {
  isEditing.value = false
  editingId.value = null
  Object.assign(form, {
    title: '',
    description: '',
    caseStudy: '',
    coverImage: '',
    stackTags: [],
    url: '',
    githubUrl: '',
    featured: false,
    displayOrder: projectsStore.projects.length
  })
  showModal.value = true
}

const openEditModal = (project) => {
  isEditing.value = true
  editingId.value = project._id
  Object.assign(form, {
    title: project.title || '',
    description: project.description || '',
    caseStudy: project.caseStudy || '',
    coverImage: project.coverImage || project.imageUrl || '',
    stackTags: [...(project.stackTags || [])],
    url: project.url || '',
    githubUrl: project.githubUrl || '',
    featured: Boolean(project.featured),
    displayOrder: project.displayOrder ?? 0
  })
  showModal.value = true
}

const saveProject = async () => {
  saving.value = true
  statusMsg.value = ''

  const payload = {
    ...form,
    imageUrl: form.coverImage
  }

  let result
  if (isEditing.value) {
    result = await projectsStore.updateProject(editingId.value, payload)
  } else {
    result = await projectsStore.createProject(payload)
  }

  if (result.success) {
    showModal.value = false
    statusMsg.value = `Project "${form.title}" saved successfully!`
  } else {
    alert(result.error || 'Failed to save project')
  }
  saving.value = false
}

const handleToggleFeatured = async (id) => {
  await projectsStore.toggleFeatured(id)
}

const moveProject = async (index, direction) => {
  const newIndex = index + direction
  if (newIndex < 0 || newIndex >= filteredProjects.value.length) return

  const list = [...filteredProjects.value]
  const [moved] = list.splice(index, 1)
  list.splice(newIndex, 0, moved)

  const orders = list.map((p, i) => ({ id: p._id, displayOrder: i }))
  await projectsStore.reorderProjects(orders)
}

const confirmDelete = (project) => {
  projectToDelete.value = project
}

const executeDelete = async () => {
  if (!projectToDelete.value) return
  await projectsStore.deleteProject(projectToDelete.value._id)
  statusMsg.value = `Project "${projectToDelete.value.title}" deleted.`
  projectToDelete.value = null
}

onMounted(() => {
  projectsStore.fetchProjects()
})
</script>
