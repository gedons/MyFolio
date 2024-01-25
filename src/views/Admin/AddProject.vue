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
              <h1 class="text-3xl font-bold tracking-tight text-gray-900">Create Project</h1>
              
            <router-link
            :to="{name: 'Projects'}"
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  class="w-4 h-4 -mt-1 inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
            </svg>                  
                Back
            </router-link>
            </div>              
          </div>
        </header>
      <main class="bg-gray-100">
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        
          <!-- <div v-if="projectLoading"  class="flex justify-center">
            <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div> -->
          <form  @submit.prevent="saveProject" class="animate-fade-in-down">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                      <!-- Project fields -->
                      <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                          <!-- img -->
                          <div>
                            <label class="block text-sm font-medium text-gray-700">
                              Image
                            </label>
                            <div class="mt-1 flex items-center">                             
                              <div class="relative z-20 bg-transparent dark:bg-form-input">
                                <input type="file" id="image" ref="imageFile" @change="handleFileChange" accept="image/*"  
                                class="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-gray-900 active:border-gray-900 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input" />                                                                 
                            </div>
                            </div>
                          </div>
                          <!--/ Image -->
                
  
                          <!-- title -->
                          <div>
                            <label for="title" class="block text-sm font-medium text-gray-700"
                              >Title</label
                            >
                            <input
                              type="text"
                              name="title"
                              id="title"
                              v-model="title"
                              autocomplete="project_title"
                              class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder="Project title"
                            />
                          </div>
                          <!-- /title -->

                          <!-- category -->
                          <div>
                            <label for="category" class="block text-sm font-medium text-gray-700"
                                >Select Category</label
                              >
                            <div class="relative z-20 bg-transparent dark:bg-form-input">
                              <select id="category" v-model="categoryId" 
                                class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent outline-none transition focus:border-gray-900 active:border-gray-900 dark:border-form-strokedark dark:bg-form-input" required>                                        
                                <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
                              </select>                                                                      
                            </div>
                         </div>
                          <!-- category -->
  
                          <!-- description -->
                          <div>
                            <label for="about" class="block text-sm font-medium text-gray-700">
                              Description
                            </label>
                            <div class="mt-1">
                              <textarea
                                id="description"
                                name="description"
                                rows="3"
                                v-model="description"
                                autocomplete="project_description"
                                class="shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Describe your project"
                              />
                            </div>
                          </div>
                          <!-- /description -->
  
                          <!-- url -->
                          <div>
                            <label for="url" class="block text-sm font-medium text-gray-700"
                              >Project Url</label
                            >
                            <input
                              type="text"
                              name="url"
                              id="url"
                              v-model="url"
                              autocomplete="project_url"
                              class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder="Url"
                            />
                          </div>
                          <!-- /url -->                        
                          
                          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow text-sm font-medium rounded-md text-gray-200 hover:text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                              Save
                            </button>
                          </div>
  
                      </div>
              </div>
          </form>
        </div>
      </main>
     
    </div>
  </template>
  
  <script>
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
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
      Notification,
    },

    data(){
      return {    
        navigation,
        categories: [],
        title: '',
        description: '',
        url: '',
        categoryId: '',
        image: null,
        
      };
    },

 
    created(){
        this.fetchCategories();
    },

    methods: {
        
        fetchCategories() {
                axios.get(`${api}/categories/all`).then((response) => {
                this.categories = response.data.categories;        
                this.loading = false;     
                })
                .catch((error) => {
                console.error('Error getting categories:', error);     
                this.loading = false;       
                });      
        }, 

        handleFileChange(event) {
            this.image = event.target.files[0];
            console.log(this.image);
          },

         //create project
         async saveProject(){          
          try {
            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('categoryId', this.categoryId);
            formData.append('url', this.url);
            formData.append('image', this.image);

             // Auth token
             const token = sessionStorage.getItem('adminToken');   

            const response = await axios.post(`${api}/projects/create`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                 Authorization: `Bearer ${token}`, 
              },
            });

            if (response.data.message === 'Project created successfully') {
            this.$toast.success('Project Created Successfully.', { timeout: 3000 });
            this.$router.push({ name: 'Projects' });
            } else {
            this.$toast.error('An Error Occurred. Please try again!', { timeout: 9000 });
            }
          } catch (error) {
            console.error('Error adding project:', error);
          }
         }
       
    }



  };
  </script>
  
 
  
  <style scoped>
  </style>