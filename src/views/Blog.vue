<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-gradient-to-r from-gray-800 to-gray-900 fixed top-0 left-0 w-full z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 inline-flex items-center justify-center space-x-2">
            <img class="block mx-auto rounded-full overflow-hidden w-8 h-8 transform transition ease-out duration-150 border-2 border-gray-50 hover:border-white hover:shadow-md hover:scale-125 active:border-gray-50 active:shadow-sm active:scale-110" src="https://lh3.googleusercontent.com/a/AAcHTtfzX9Ny9Y5dpsP3i060Z_p1TYLoxHjlb2N1a5GgbA=s288-c-no" alt="Avatar Photo">
            <router-link :to="{name: 'Index'}" class="text-white font-bold text-xl">Gedoni Ani</router-link>
          </div>
  
          <!-- Navigation Links -->
          <div class="hidden md:block">
            <div class="mx-auto flex items-baseline space-x-2">
              <router-link :to="{name: 'Index'}" class="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Home</router-link>
              <router-link :to="{ name: 'Blog' }" exact class="text-gray-300 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" :class="[ $route.name === 'Blog' ? 'bg-indigo-700 text-white' : '' ]">Blog</router-link>
            </div>
          </div>
  
  
          <!-- Mobile Menu Button (hambuger) -->
          <div class="-mr-2 flex md:hidden">
            <button @click="isOpen = !isOpen" type="button" class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <!-- Icon when menu is closed -->
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <!-- Icon when menu is open -->
              <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Mobile Menu -->
      <div class="md:hidden" :class="{'block': isOpen, 'hidden': !isOpen}" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <router-link :to="{name: 'Index'}" class="text-gray-300 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</router-link>          
          <router-link :to="{name: 'Blog'}" exact class="text-gray-300 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" :class="[ $route.name === 'Blog' ? 'bg-indigo-700 text-white' : '' ]">Blog</router-link>
        </div>
      </div>
    </nav>
  

    <!-- blog -->
  <div class="flex-grow bg-white dark:text-gray-100 dark:bg-gray-900">
    <div class="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
      <!-- Heading -->
      <div class="text-center mt-3">
        <h2 class="text-4xl font-black text-black dark:text-white">
          Blog Posts
        </h2>
      </div>
      <!-- END Heading -->
  <pre>{{frontBlog.data.status}}</pre>
      <!-- content -->
      <div v-if="frontBlog.loading" class="flex justify-center">
        <svg  class="animate-spin text-center  h-8 w-8 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div v-for="(post, ind) in frontBlog.data" :key="post.id" class="animate-fade-in-down"  :style="{animationDelay: `${ind * 0.1}s`}">                      
          <img :src="post.image_url" class="w-full h-60 object-cover">
          <h4 class="font-semibold mb-2 mt-2">
            {{post.title}}
          </h4>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">
            {{post.description}}
          </p>
          <small class="leading-relaxed text-gray-300">
            Author:
            <i class="font-semibold">Gedoni Ani</i>
          </small><br/>
          <a :href="post.url" class="mt-2 inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded border-blue-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-blue-800 focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700" target="_blank">
            <span>View Post</span>
         </a>
        </div>     

      </div>
      <!-- <div v-else class="text-2xl text-center font-semibold leading-relaxed text-gray-500">
          No Blog Post Avalaible
      </div> -->
      <!-- END content -->

    </div>
  </div>

    <!-- end blog -->
  
  
    <!-- Page Footer -->
    <footer id="page-footer" class="flex-none items-center bg-gradient-to-r from-gray-800 to-gray-900">
      <div class="text-center flex flex-col md:text-left md:flex-row md:justify-between text-sm container xl:max-w-7xl mx-auto px-4 lg:px-8">
        <div class="pt-4 pb-1 md:pb-4">
          <a href="#" class="font-semibold text-white hover:text-indigo-700 focus:outline-none" target="_blank">Gedoni Ani © 2023</a> 
        </div>
        <div class="pb-4 pt-1 md:pt-4 inline-flex items-center justify-center">
          <a href="#" class="text-white hover:text-indigo-700">
            <svg fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-143 145 512 512" xml:space="preserve" class="mx-2 inline-block w-4 h-4"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7 c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4 c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8 c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4 c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"></path> <rect x="-8.5" y="348.4" width="49.9" height="159.7"></rect> <path d="M15.4,273c-18.4,0-30.5,11.9-30.5,27.7c0,15.5,11.7,27.7,29.8,27.7h0.4c18.8,0,30.5-12.3,30.4-27.7 C45.1,284.9,33.8,273,15.4,273z"></path> <path d="M177.7,346.9c-28.6,0-46.5,15.6-49.8,26.6v-25.1H71.8c0.7,13.3,0,159.7,0,159.7h56.1v-86.3c0-4.9-0.2-9.7,1.2-13.1 c3.8-9.6,12.1-19.6,27-19.6c19.5,0,28.3,14.8,28.3,36.4v82.6H241v-88.8C241,369.9,213.2,346.9,177.7,346.9z"></path> </g> </g></svg>
          </a>
          <a href="#" class="text-white hover:text-indigo-700">
              <svg fill="currentColor" class="mx-2 inline-block w-4 h-4" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#142]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g></svg>
          </a>
          <a href="#" class="text-white hover:text-indigo-700">
            <svg fill="currentColor"  class="mx-2  inline-block w-4 h-4" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-143 145 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7 c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4 c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8 c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4 c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"></path> <path d="M234.3,313.1c-10.2,6-21.4,10.4-33.4,12.8c-9.6-10.2-23.3-16.6-38.4-16.6c-29,0-52.6,23.6-52.6,52.6c0,4.1,0.4,8.1,1.4,12 c-43.7-2.2-82.5-23.1-108.4-55c-4.5,7.8-7.1,16.8-7.1,26.5c0,18.2,9.3,34.3,23.4,43.8c-8.6-0.3-16.7-2.7-23.8-6.6v0.6 c0,25.5,18.1,46.8,42.2,51.6c-4.4,1.2-9.1,1.9-13.9,1.9c-3.4,0-6.7-0.3-9.9-0.9c6.7,20.9,26.1,36.1,49.1,36.5 c-18,14.1-40.7,22.5-65.3,22.5c-4.2,0-8.4-0.2-12.6-0.7c23.3,14.9,50.9,23.6,80.6,23.6c96.8,0,149.7-80.2,149.7-149.7 c0-2.3,0-4.6-0.1-6.8c10.3-7.5,19.2-16.7,26.2-27.3c-9.4,4.2-19.6,7-30.2,8.3C222.1,335.7,230.4,325.4,234.3,313.1z"></path> </g> </g></svg>
          </a>
        </div>
      </div>
    </footer>
    <!-- END Page Footer -->
  </div>
  </template>
  
  <script>
 
  export default {
  data() {
    return {
      isOpen: false      
    }
  },
  
  methods: {
 
  },
  computed: {},
  
  }
  </script>
  
  <script setup>
  import store from "../store";
  // import TButton from "../../components/TButton.vue";
  import { computed } from "vue";
  // import { LinkIcon } from '@heroicons/vue/24/outline';
  
  const frontBlog = computed(() => store.state.frontBlog);

  store.dispatch("getFrontBlogs");
  
  </script>
  
  <style scoped>
  </style>
  
  
  