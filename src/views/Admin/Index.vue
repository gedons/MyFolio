<template>

  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link v-for="item in navigation" :key="item.name" :to="item.to" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium cursor-pointer']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button type="button" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton class="flex max-w-xs items-center rounded-full bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <a @click="logout"  :class="['block px-4 py-2 text-sm text-gray-300 hover:text-white font-medium cursor-pointer']">End Current Session</a>
                  </MenuButton>
                </div>
               
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <router-link v-for="item in navigation" :key="item.name" :to="item.to" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium cursor-pointer']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
        </div>
        <div class="border-t border-gray-700 pb-3">
          <div class="mt-3 space-y-1 px-2">
              <DisclosureButton 
                  as="a" 
                  @click="logout"
                  class="block rounded-md px-3 py-2 text-base 
                  font-medium text-gray-200 hover:bg-gray-700
                hover:text-white cursor-pointer">End Current Session
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main class="bg-gray-100">
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <!-- Statistics: Simple with Action -->
          <div v-if="loading" class="flex justify-center">
            <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-900">
            
              <!-- Project count -->
              <div class="order-1 lg:order-1 row-span-2 bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down" style="animation-delay: 0.2s">
                <h2 class="text-3xl mb-3 text-center font-semibold">Project</h2>
                  <div class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">{{countProjects}}</div>
                  <div class="flex jitems-center justify-center">
                    <router-link class="
                      py-2
                      px-3
                      font-semibold
                      focus:outline-none
                      leading-6 
                      rounded
                      border
                      hover:bg-gray-800
                      hover:text-white
                    "
                      :to="{ name: 'Index'}"
                      link
                    >
                      <PlusIcon class="w-4 h-4 inline-block" />
                      New Project
                  </router-link>

                
                  </div>
                  <div class="text-gray-600 text-center py-16">
                    You don't have any project yet
                  </div>
              </div>
              <!-- /Project count -->
            
              <!-- blog count -->
              <div class="order-2 lg:order-2 row-span-2 bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down" style="animation-delay: 0.2s">
                <h2 class="text-3xl mb-3 text-center font-semibold">Blog</h2>
                <div
                  class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center"
                >
                  {{countBlogs}}
                </div>
                <div class="flex items-center justify-center">
                  <router-link class="
                    py-2
                    px-3
                    font-semibold
                    focus:outline-none
                    leading-6 
                    rounded
                    border
                    hover:bg-gray-800
                    hover:text-white
                  "
                    :to="{ name: 'Index'}"
                    link
                  >
                    <PlusIcon class="w-4 h-4 inline-block" />
                    New Blog
                </router-link>

              
                </div>
                <div class="text-gray-600 text-center py-16">
                  You don't have any blog yet
                </div>
              </div>
              <!-- /blog count -->

              <!-- total category -->
              <div class="order-3 lg:order-1 row-span-2 bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down" style="animation-delay: 0.2s">
                <h2 class="text-3xl mb-3 text-center font-semibold">Category</h2>
                  <div class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">{{countCategories}}</div>
                  <div class="flex items-center justify-center">
                    <router-link class="
                      py-2
                      px-3
                      font-semibold
                      focus:outline-none
                      leading-6 
                      rounded
                      border
                      hover:bg-gray-800
                      hover:text-white
                    "
                      :to="{ name: 'Index'}"
                      link
                    >
                      <PlusIcon class="w-4 h-4 inline-block" />
                      New Category
                  </router-link>

                
                  </div>
                  <div class="text-gray-600 text-center py-16">
                    You don't have any project yet
                  </div>
              </div>
              <!-- /total category -->
            </div>
          <!-- END Statistics: Simple with Action -->
      </div>
    </main>
  </div>
</template>

 

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline';
import moment from 'moment';
import axios from 'axios';
import { inject } from '@vercel/analytics';
import api from '../../api';

const navigation = [
  { name: 'Dashboard', to: { name: "Admin" }, current: true },
  { name: 'Projects',  to: { name: "Projects" }, current: false },
  // { name: 'Blog',  to: { name: "Ablog" }, current: false },
  // { name: 'Messages',  to: { name: "Message" }, current: false },
]


export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    XMarkIcon,
    Bars3Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    PlusIcon,
    Notification,
  },

  data() {
    return {
      navigation,
      countProjects: [],
      countBlogs: [],
      countCategories: [],
    };
  },

  created() {
    this.totalProjects();
    this.totalBlogs();
    this.totalCategories();
  },
  

  methods: {
  formatDate(date) {
    return moment(date).fromNow();
  },

  totalProjects() {
        axios.get(`${api}/projects/total/getTotalProjects`).then((response) => {
        this.countProjects = response.data.totalProjects;        
        this.loading = false;     
        })
        .catch((error) => {
        console.error('Error getting total projects:', error);     
        this.loading = false;       
        });      
  },
  totalBlogs() {
        axios.get(`${api}/blogs/total/getTotalBlogs`).then((response) => {
        this.countBlogs = response.data.totalBlogs;        
        this.loading = false;     
        })
        .catch((error) => {
        console.error('Error getting total blogs:', error);     
        this.loading = false;       
        });      
  },
  totalCategories() {
        axios.get(`${api}/categories/total/getTotalCategories`).then((response) => {
        this.countCategories = response.data.totalCategories;        
        this.loading = false;     
        })
        .catch((error) => {
        console.error('Error getting total categories:', error);     
        this.loading = false;       
        });      
  },
},
};
</script>

