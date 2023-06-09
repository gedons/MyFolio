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
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <!-- Statistics: Simple with Action -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
            <!-- Card -->
            <div class="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden dark:text-gray-100 dark:bg-gray-800">
            <!-- Body -->
            <div class="p-5 grow flex justify-between items-center">
                <dl class="space-y-1">
                <dt class="text-2xl font-bold">
                    14
                </dt>
                <dd class="uppercase font-semibold text-sm text-gray-500 tracking-wider dark:text-gray-400">
                    Projects
                </dd>
                </dl>
                <div class="font-semibold inline-flex px-2 py-1 leading-4 items-center space-x-1 text-sm rounded-full text-indigo-900 bg-indigo-200">
                <svg class="hi-solid hi-arrow-circle-up inline-block w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/></svg>
                <span>7.9%</span>
                </div>
            </div>
            <!-- END Body -->
        
            <!-- Action Link -->
            <a href="#" class="block p-3 font-medium text-sm text-center bg-gray-50 hover:bg-gray-100 hover:bg-opacity-75 active:bg-gray-50 text-indigo-600 hover:text-indigo-700 dark:text-white dark:bg-gray-900/50 dark:hover:text-indigo-300 dark:hover:bg-gray-900/75 dark:active:bg-gray-900/50">
                Create New 
            </a>
            <!-- END Action Link -->
            </div>
            <!-- END Card -->
        
            <!-- Card -->
            <div class="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden dark:text-gray-100 dark:bg-gray-800">
            <!-- Body -->
            <div class="p-5 grow flex justify-between items-center">
                <dl class="space-y-1">
                <dt class="text-2xl font-bold">
                    5
                </dt>
                <dd class="uppercase font-semibold text-sm text-gray-500 tracking-wider dark:text-gray-400">
                    Blog Posts
                </dd>
                </dl>
                <div class="font-semibold inline-flex px-2 py-1 leading-4 items-center space-x-1 text-sm rounded-full text-indigo-800 bg-indigo-200">
                <svg class="hi-solid hi-arrow-circle-down inline-block w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd"/></svg>
                <span>6.9%</span>
                </div>
            </div>
            <!-- END Body -->
        
            <!-- Action Link -->
            <a href="#" class="block p-3 font-medium text-sm text-center bg-gray-50 hover:bg-gray-100 hover:bg-opacity-75 active:bg-gray-50 text-indigo-600 hover:text-indigo-700 dark:text-white dark:bg-gray-900/50 dark:hover:text-indigo-300 dark:hover:bg-gray-900/75 dark:active:bg-gray-900/50">
                Create New
            </a>
            <!-- END Action Link -->
            </div>
            <!-- END Card -->
        
            <!-- Card -->
            <div class="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden dark:text-gray-100 dark:bg-gray-800">
            <!-- Body -->
            <div class="p-5 grow flex justify-between items-center">
                <dl class="space-y-1">
                <dt class="text-2xl font-bold">
                    5
                </dt>
                <dd class="uppercase font-semibold text-sm text-gray-500 tracking-wider dark:text-gray-400">
                    Messages
                </dd>
                </dl>
                <div class="font-semibold inline-flex px-2 py-1 leading-4 items-center space-x-1 text-sm rounded-full text-indigo-800 bg-indigo-200">
                <svg class="hi-solid hi-arrow-circle-up inline-block w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/></svg>
                <span>5.6%</span>
                </div>
            </div>
            <!-- END Body -->
        
            <!-- Action Link -->
            <a href="#" class="block p-3 font-medium text-sm text-center bg-gray-50 hover:bg-gray-100 hover:bg-opacity-75 active:bg-gray-50 text-indigo-600 hover:text-indigo-700 dark:text-white dark:bg-gray-900/50 dark:hover:text-indigo-300 dark:hover:bg-gray-900/75 dark:active:bg-gray-900/50">
                View Messages
            </a>
            <!-- END Action Link -->
            </div>
            <!-- END Card -->
            </div>
          <!-- END Statistics: Simple with Action -->
      </div>
    </main>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";


const navigation = [
  { name: 'Dashboard', to: { name: "Admin" }, current: true },
  { name: 'Projects',  to: { name: "Project" }, current: false },
  { name: 'Blog',  to: { name: "Ablog" }, current: false },
  { name: 'Messages',  to: { name: "Message" }, current: false },
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
};
</script>