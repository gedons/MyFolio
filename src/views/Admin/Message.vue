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
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Messages</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div class="flex-grow bg-gray-100 text-gray-10">
            <div class="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
              <!-- content -->             
              <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                <div v-for="(contact, ind) in contacts" :key="contact.id"  class="animate-fade-in-down" :style="{animationDelay: `${ind * 0.1}s`}">                    
                  <span class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-800">
                    <svg viewBox="0 0 1024 1024" class="icon h-[80%] w-[80%] text-gray-300" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M910.3 842.3H173.6c-27.4 0-49.7-22.3-49.7-49.7V296.1c0-27.4 22.3-49.7 49.7-49.7h736.7c27.4 0 49.7 22.3 49.7 49.7v496.4c0 27.5-22.3 49.8-49.7 49.8z" fill="#A7B8C6"></path>
                        <path d="M272.4 195.3H118.8c-22.8 0-41.3 18.5-41.3 41.3v513.3c0 22.8 18.5 41.3 41.3 41.3h753.5c22.8 0 41.3-18.5 41.3-41.3V236.6c0-22.8-18.5-41.3-41.3-41.3H272.4z" fill="#FFFFFF"></path>
                        <path d="M914.2 430.2H846c-1.3 0-2.4-1.1-2.4-2.4v-43c0-1.3 1.1-2.4 2.4-2.4h68.2c1.3 0 2.4 1.1 2.4 2.4v43c0 1.4-1.1 2.4-2.4 2.4z" fill="#E74138"></path>
                        <path d="M914.2 505.6H846c-1.3 0-2.4-1.1-2.4-2.4v-43c0-1.3 1.1-2.4 2.4-2.4h68.2c1.3 0 2.4 1.1 2.4 2.4v43c0 1.3-1.1 2.4-2.4 2.4z" fill="#3474B9"></path>
                        <path d="M914.2 581H846c-1.3 0-2.4-1.1-2.4-2.4v-43c0-1.3 1.1-2.4 2.4-2.4h68.2c1.3 0 2.4 1.1 2.4 2.4v43c0 1.3-1.1 2.4-2.4 2.4zM153.2 430.2H85c-1.3 0-2.4-1.1-2.4-2.4v-43c0-1.3 1.1-2.4 2.4-2.4h68.2c1.3 0 2.4 1.1 2.4 2.4v43c-0.1 1.4-1.1 2.4-2.4 2.4z" fill="#E74138"></path>
                        <path d="M153.2 505.6H85c-1.3 0-2.4-1.1-2.4-2.4v-43c0-1.3 1.1-2.4 2.4-2.4h68.2c1.3 0 2.4 1.1 2.4 2.4v43c-0.1 1.3-1.1 2.4-2.4 2.4z" fill="#3474B9"></path>
                        <path d="M153.2 581H85c-1.3 0-2.4-1.1-2.4-2.4v-43c0-1.3 1.1-2.4 2.4-2.4h68.2c1.3 0 2.4 1.1 2.4 2.4v43c-0.1 1.3-1.1 2.4-2.4 2.4z" fill="#E74138"></path>
                        <path d="M873.5 223.9c12.5-8.9 6.2-28.7-9.2-28.7H126.9c-15.4 0-21.7 19.7-9.2 28.7l332.1 236.7c27.4 19.5 64.1 19.5 91.4 0l332.3-236.7z" fill="#FFFFFF"></path>
                        <path d="M495.6 485.8c-18.7 0-36.6-5.7-51.8-16.6L111.7 232.5c-9.5-6.8-13.4-18.4-9.8-29.5 3.6-11.1 13.4-18.3 25.1-18.3h737.4c11.7 0 21.5 7.2 25.1 18.3 3.6 11.1-0.3 22.7-9.8 29.5L547.4 469.2c-15.2 10.9-33.1 16.6-51.8 16.6z m-368.7-280c-3.5 0-4.6 2.6-5 3.6-0.4 1.1-0.9 3.9 2 5.9L456 452.1c11.6 8.3 25.3 12.7 39.6 12.7s28-4.4 39.6-12.7l332.1-236.7c2.8-2 2.3-4.8 2-5.9-0.4-1.1-1.5-3.6-5-3.6H126.9z" fill="#3E3A39"></path>
                        <path d="M872.4 804.7H118.8c-30.2 0-54.8-24.6-54.8-54.8V236.6c0-30.2 24.6-54.8 54.8-54.8h753.5c30.2 0 54.8 24.6 54.8 54.8v513.3c0.1 30.2-24.5 54.8-54.7 54.8zM118.8 208.8c-15.3 0-27.7 12.4-27.7 27.7v513.3c0 15.3 12.4 27.7 27.7 27.7h753.5c15.3 0 27.7-12.4 27.7-27.7V236.6c0-15.3-12.4-27.7-27.7-27.7H118.8z" fill="#3E3A39"></path>
                        <path d="M496.1 474.3m-71.2 0a71.2 71.2 0 1 0 142.4 0 71.2 71.2 0 1 0-142.4 0Z" fill="#FFFFFF"></path>
                        <path d="M496.1 556c-45.1 0-81.7-36.7-81.7-81.7s36.7-81.7 81.7-81.7 81.7 36.7 81.7 81.7-36.7 81.7-81.7 81.7z m0-142.4c-33.4 0-60.6 27.2-60.6 60.6 0 33.4 27.2 60.6 60.6 60.6s60.6-27.2 60.6-60.6c0-33.4-27.2-60.6-60.6-60.6z" fill="#3E3A39"></path>
                        <path d="M496.1 474.3m-39.2 0a39.2 39.2 0 1 0 78.4 0 39.2 39.2 0 1 0-78.4 0Z" fill="#E74138"></path>
                        <path d="M496.1 524c-27.4 0-49.7-22.3-49.7-49.7s22.3-49.7 49.7-49.7 49.7 22.3 49.7 49.7-22.3 49.7-49.7 49.7z m0-78.3c-15.8 0-28.6 12.8-28.6 28.6s12.8 28.6 28.6 28.6 28.6-12.8 28.6-28.6-12.9-28.6-28.6-28.6z" fill="#336EAD"></path>
                        <path d="M666.7 685h-490c-2 0-3.6-1.6-3.6-3.6v-14.6c0-2 1.6-3.6 3.6-3.6h490c2 0 3.6 1.6 3.6 3.6v14.6c0 2-1.6 3.6-3.6 3.6zM511.5 725.7H176.8c-2 0-3.6-1.6-3.6-3.6v-14.6c0-2 1.6-3.6 3.6-3.6h334.8c2 0 3.6 1.6 3.6 3.6v14.6c0 2-1.7 3.6-3.7 3.6zM817.4 638.6H176.8c-2 0-3.6-1.6-3.6-3.6v-14.6c0-2 1.6-3.6 3.6-3.6h640.6c2 0 3.6 1.6 3.6 3.6V635c0 2-1.6 3.6-3.6 3.6z" fill="#C9E6E6"></path></g>
                    </svg>
                  </span>
                  <h4 class="font-semibold mb-2 mt-2">
                    New Message
                  </h4>
                  <small class="leading-relaxed text-gray-700">
                    From:
                    <i class="font-semibold">{{contact.email}}</i>
                  </small><br/>
                  <small class="leading-relaxed text-gray-700">
                    Author:
                    <i class="font-semibold">{{contact.name}}</i>
                  </small><br/>
                  <small class="leading-relaxed text-gray-700">
                    Sent:
                    <i class="font-semibold">{{ formatDate(contact.created_at) }}</i>
                  </small><br/>                  
                  <a href="https://mail.google.com/mail/u/0/#inbox"  class="mt-2 inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded border-blue-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-blue-800 focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700 cursor-pointer" target="blank">
                    <span>Open Gmail App</span>
                 </a>
                </div> 
           
              </div>  
              <!-- end content -->
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { useStore } from "vuex";
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import axios from 'axios';
  import moment from 'moment';
  
  const navigation = [
    { name: 'Dashboard', to: { name: "Admin" }, current: false },
    { name: 'Projects',  to: { name: "Project" }, current: false },
    { name: 'Blog',  to: { name: "Ablog" }, current: false },
    { name: 'Messages',  to: { name: "Message" }, current: true },
  ]

  export default {
    data() {
    return {
      contacts: [],
    };
  },
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
  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.dispatch("logout").then(() => {
        router.push({
          name: "Login",
        });
      });
    }

    //store.dispatch("getUser");

    return {
      user: computed(() => store.state.user.data),
      navigation,
      logout,
    };
  },

  mounted() {
    this.getContacts();
  },

  methods: {
    getContacts() {
      axios.get('http://localhost:8000/api/view/show')
        .then(response => {
          this.contacts = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    formatDate(date) {
    return moment(date).fromNow();
  },
  },

  };
  </script>