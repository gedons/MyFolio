
<template>

    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Welcome Gedoni</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="loginAdmin">
          <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
            {{ errorMsg }}
            <span
              @click="errorMsg = ''"
              class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer  hover:bg-[rgba(0,0,0,0.2)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" v-model="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" v-model="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <button type="submit" 
              class="flex w-full justify-center rounded-md
                 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6
                 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                   focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-indigo-600"
                 
                 
                 >
              <!-- <svg v-if="loading" class="animate-spin -ml-1 mr-3  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> -->
              Sign in</button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          Exclusive
          {{ ' ' }}
          <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Access</a>
        </p>
      </div>
    </div>
  </template>

  <script>
 export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
  async loginAdmin() {
    try {
      const success = await this.$store.dispatch('adminLogin', {
        email: this.email,
        password: this.password,
      });

      if (success) {
        this.$toast.success('Admin Login successful.', {
          timeout: 3000,
        });
        console.log('Successfully logged in!');
        this.$router.push({ name: 'Admin' });
      } else {
        this.$toast.error('Admin details do not exist. Confirm and try again!', {
          timeout: 9000,
        });
      }
    } catch (error) {
      console.error('Admin Login Failed', error.message);
    }
  },
}

}
  </script>
  