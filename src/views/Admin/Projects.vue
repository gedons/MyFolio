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
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
            <router-link
            :to="{name: 'AddProject'}"
              class="
                py-2
                px-3
                font-semibold
                focus:outline-none
                leading-6 
                rounded
                border
                text-gray-200
                hover:text-white
                bg-gray-800
              
              "
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-4 -mt-1 inline-block">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
            
                Create
            </router-link>
          </div>              
        </div>
      </header>
      <main class="bg-gray-100">
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

          <div v-if="loading" class="flex justify-center">
            <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div v-else>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                <div v-for="(project, ind) in projects" :key="project.id" class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h[470px] opacity-0 animate-fade-in-down" :style="{animationDelay: `${ind * 0.1}s`}">
                  <img :src="project.imageUrl" alt="img" class="w-full h-48 object-cover"/>
                  <h4 class="mt-4 text-lg font-bold">{{project.title}}</h4>
                  <p class="overflow-hidden flex-1">{{ truncateDescription(project.description, 100) }}</p>

                  <div class="flex justify-between items-center mt-3">
                    <router-link :to="{name: 'Index'}" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>                  
                      Edit
                    </router-link>
                    <div class="flex items-center">
                      <TButton :href="project.url" class="cursor-pointer" circle link target="_blank">
                        <LinkIcon class="w-5 h-5" />
                      </TButton>
                      <button v-if="project.id" type="button" @click="deleteProject(project)" class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mt-1 inline-block">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        
                      </button>
                    </div>
                  </div>
                </div>
                
            </div>
            <div class="flex justify-center mt-5">
              <nav
              class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              
              <a
                v-for="(link, i) of projects.links"
                :key="i"
                :disabled="!link.url"
                href="#"
                @click="getForPage($event, link)"
                aria-current="page"
                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
                :class="[
                  link.active
                    ? 'z-10 bg-indigo-50 border-gray-800 text-gray-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
                  i === projects.links.length - 1 ? 'rounded-r-md' : '',
                ]"
                v-html="link.label"
              >
              </a>
            </nav>
            </div>
          </div>
           
        </div>
      </main>
     
    </div>
  </template>
  
  <script>
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { Bars3Icon, BellIcon, XMarkIcon, LinkIcon } from '@heroicons/vue/24/outline'
  import moment from 'moment';
  import axios from 'axios';
  import { inject } from '@vercel/analytics';
  import api from '../../api';


  const navigation = [
    { name: 'Dashboard', to: { name: "Admin" }, current: false },
    { name: 'Projects',  to: { name: "Projects" }, current: true },
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
    LinkIcon,
  },

  data(){
      return {    
        navigation,
        projects: [],
        loading: true,
      };
    },

    created() {
        this.fetchProjects();
    },

    methods: {
        fetchProjects(){
            axios.get(`${api}/projects/all`).then((response) => {
                this.projects = response.data.projects;    
                this.loading = false;       
                })
                .catch((error) => {
                console.error('Error getting projects:', error);   
                    this.loading = false;       
                });      
        },

        truncateDescription(description, maxLength) {
            if (description.length > maxLength) {
                return description.slice(0, maxLength) + '...';
            } else {
                return description;
            }
        },
    }

  };
  </script>


<style scoped>
</style>
  