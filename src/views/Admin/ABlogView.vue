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
              <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{route.params.id ? model.title : "Create Blog Post"}}</h1>
              <button
                v-if="route.params.id"
                @click="deleteBlog()"
                type="button"
                class="
                  py-2
                  px-3
                  font-semibold
                  focus:outline-none
                  leading-6 
                  rounded
                  border
                  text-white
                  hover:text-gray-200
                  bg-red-600
                
                "
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 -mt-1 inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>                          
                  Delete Post
            </button>
            <router-link
             v-else
            :to="{name: 'Ablog'}"
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
        
          <div v-if="blogLoading"  class="flex justify-center">
            <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <form v-else @submit.prevent="saveBlog" class="animate-fade-in-down">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                      <!-- Project fields -->
                      <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                          <!-- img -->
                          <div>
                            <label class="block text-sm font-medium text-gray-700">
                              Image
                            </label>
                            <div class="mt-1 flex items-center">
                              <img
                                v-if="model.image_url"
                                :src="model.image_url"
                                :alt="model.title"
                                class="w-64 h-48 object-cover"
                              />
                              <span
                                v-else
                                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-[80%] w-[80%] text-gray-300"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </span>
                              <button
                                type="button"
                                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <input
                                  type="file"
                                  @change="onImageChoose"
                                  class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                                />
                                Change
                              </button>
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
                              v-model="model.title"
                              autocomplete="blog_title"
                              class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder="Post title"
                            />
                          </div>
                          <!-- /title -->
  
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
                                v-model="model.description"
                                autocomplete="blog_description"
                                class="shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Enter post body"
                              />
                            </div>
                          </div>
                          <!-- /description -->
  
                          <!-- url -->
                          <div>
                            <label for="url" class="block text-sm font-medium text-gray-700"
                              >Post Url</label
                            >
                            <input
                              type="text"
                              name="url"
                              id="url"
                              v-model="model.url"
                              autocomplete="blog_url"
                              class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder="Post url"
                            />
                          </div>
                          <!-- /url -->
  
                          <!-- status -->
                          <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input
                                id="status"
                                name="status"
                                type="checkbox"
                                :checked="model.status"
                                v-model="model.status"
                                :class="{'focus:ring-gray-500': model.status, 'h-4': true, 'w-4': true, 'text-gray-800': true, 'border-gray-300': true, 'rounded': true}"
                              />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="status" class="font-medium text-gray-700"
                                >Active</label
                              >
                            </div>
                          </div>
                          <!-- /status -->
                          
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
      <div
        v-if="notification.show"
        class="fixed w-[300px] right-4 bottom-4 py-2 px-4 text-white rounded-full animate-fade-in-down"
        :class="[notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']"
      >
        {{ notification.message }}
    </div>
    </div>
  </template>
  
  <script>
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
  import { useStore } from "vuex";
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  
  
  const navigation = [
    { name: 'Dashboard', to: { name: "Admin" }, current: false },
    { name: 'Projects',  to: { name: "Project" }, current: false },
    { name: 'Blog',  to: { name: "Ablog" }, current: true },
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
      
  
      return {
        user: computed(() => store.state.user.data),
        navigation,
        logout,
      };
    },
  };
  </script>
  
  <script setup>
  import store from "../../store";
  import { computed, ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  
  const router = useRouter();
  const route = useRoute();
  
  // Get blog post loading state, which only changes when we fetch project from backend
  const blogLoading = computed(() => store.state.currentBlog.loading);
  
  //get notifications 
  const notification = computed(() => store.state.notification);
  
  
  // Create blog post
  let model = ref({
    title: "",
    slug: "",
    url: "",
    status: false,
    description: null,
    image_url: null,
  });
  
  // Watch current blog  data change and when this happens we update local model
  watch(
    () => store.state.currentBlog.data,
    (newVal, oldVal) => {
      model.value = {
        ...JSON.parse(JSON.stringify(newVal)),
        status: !!newVal.status,
      };
    }
  );
  
  // If the current component is rendered on survey update route we make a request to fetch survey
  if (route.params.id) {
    store.dispatch("getBlog", route.params.id);
  }
  
  // input type file image choose function
  function onImageChoose(ev) {
    const file = ev.target.files[0];
  
    const reader = new FileReader();
    reader.onload = () => {
      // The field to send on backend and apply validations
      model.value.image = reader.result;
  
      // The field to display here
      model.value.image_url = reader.result;
      ev.target.value = "";
    };
    reader.readAsDataURL(file);
  }
  
  
  /**
   * Create or update project
   */
   function saveBlog() {
    let action = "created";
    if (model.value.id) {
      action = "updated";
    }
    store.dispatch("saveBlog", { ...model.value }).then(({ data }) => {
      store.commit("notify", {
        type: "success",
        message: "The Post was successfully " + action,
      });
      router.push({
        name: "ABlogView",
        params: { id: data.data.id },
      });
    });
  }
  
  function deleteBlog(){
    if (
      confirm(
        `Are you sure you want to delete this Post? Operation can't be undone!!`
      )
    ) {
      store.dispatch("deleteBlog", model.value.id).then(() => {
        router.push({
          name: "Ablog",
        });
      });
    }
  }
  
  </script>
  
  <style scoped>
  </style>