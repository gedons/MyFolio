<template>
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
            <a @click="scrollToSection('#portfolio')" class="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Portfolio</a>
            <a @click="scrollToSection('#about')"  class="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">About Me</a>
            <router-link :to="{name: 'Blog'}" class="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Blog</router-link>    
            <a @click="scrollToSection('#contact')" class="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Contact</a>                      
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
        <a @click="scrollToSection('#portfolio')"  class="text-gray-300 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Portfolio</a>
        <a @click="scrollToSection('#about')"  class="text-gray-300 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About Me</a>
        <router-link :to="{name: 'Blog'}" class="text-gray-300 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Blog</router-link>
        <a @click="scrollToSection('#contact')" class="text-gray-300 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>                
      </div>
    </div>
  </nav>

  <!-- Header section -->
  <header id="home" class="bg-white mt-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
      <div class="flex items-center text-center lg:text-left">
        <div class="space-y-10">
          <!-- Heading -->
          <div>
            <!-- <div class="text-sm uppercase font-bold tracking-wider mb-1 text-indigo-700">
              FluxGenius
            </div> -->
            <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
              <!-- Hi, i'm Gedoni <span class="text-indigo-600">Ani</span> -->
              {{typedText1 }}
            </h2>
            <h3 class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600">
              I specialize in crafting exceptional user experiences through code. Welcome to my portfolio, where you are invited to explore my work and witness the magic I create.
            </h3>
            <div class="pt-1 md:pt-4 inline-flex items-center justify-center">
              <a href="https://www.linkedin.com/in/gedonidev/" class="hover:text-indigo-700" target="_blank">
                <svg fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-143 145 512 512" xml:space="preserve" class="inline-block w-6 h-6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7 c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4 c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8 c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4 c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"></path> <rect x="-8.5" y="348.4" width="49.9" height="159.7"></rect> <path d="M15.4,273c-18.4,0-30.5,11.9-30.5,27.7c0,15.5,11.7,27.7,29.8,27.7h0.4c18.8,0,30.5-12.3,30.4-27.7 C45.1,284.9,33.8,273,15.4,273z"></path> <path d="M177.7,346.9c-28.6,0-46.5,15.6-49.8,26.6v-25.1H71.8c0.7,13.3,0,159.7,0,159.7h56.1v-86.3c0-4.9-0.2-9.7,1.2-13.1 c3.8-9.6,12.1-19.6,27-19.6c19.5,0,28.3,14.8,28.3,36.4v82.6H241v-88.8C241,369.9,213.2,346.9,177.7,346.9z"></path> </g> </g></svg>
              </a>
              <a href="https://github.com/gedons" class="hover:text-indigo-700" target="_blank">

                  <svg fill="currentColor" class="mx-2 inline-block w-6 h-6" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#142]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g></svg>
              </a>
              <a href="https://twitter.com/nerdyGedoni" class="hover:text-indigo-700" target="_blank">

                <svg fill="currentColor"  class=" inline-block w-6 h-6" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-143 145 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7 c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4 c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8 c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4 c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"></path> <path d="M234.3,313.1c-10.2,6-21.4,10.4-33.4,12.8c-9.6-10.2-23.3-16.6-38.4-16.6c-29,0-52.6,23.6-52.6,52.6c0,4.1,0.4,8.1,1.4,12 c-43.7-2.2-82.5-23.1-108.4-55c-4.5,7.8-7.1,16.8-7.1,26.5c0,18.2,9.3,34.3,23.4,43.8c-8.6-0.3-16.7-2.7-23.8-6.6v0.6 c0,25.5,18.1,46.8,42.2,51.6c-4.4,1.2-9.1,1.9-13.9,1.9c-3.4,0-6.7-0.3-9.9-0.9c6.7,20.9,26.1,36.1,49.1,36.5 c-18,14.1-40.7,22.5-65.3,22.5c-4.2,0-8.4-0.2-12.6-0.7c23.3,14.9,50.9,23.6,80.6,23.6c96.8,0,149.7-80.2,149.7-149.7 c0-2.3,0-4.6-0.1-6.8c10.3-7.5,19.2-16.7,26.2-27.3c-9.4,4.2-19.6,7-30.2,8.3C222.1,335.7,230.4,325.4,234.3,313.1z"></path> </g> </g></svg>
              </a>
            </div>
          </div>
          <!-- END Heading -->
  
          <!-- Action -->
          <div>
            <a @click="scrollToSection('#about')" class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-6 py-4 leading-6 rounded border-blue-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-blue-800 focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700 cursor-pointer">
              <!-- <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="opacity-50 hi-outline hi-plus-circle inline-block w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> -->
              <span>About Me</span>
            </a>
            <a href="https://drive.google.com/file/d/1mIt63EYJBtuBkXGDMRZj27OZDHSe_7Za/view?usp=sharing" class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-6 py-4 ml-2 leading-6 rounded border-gray-700 bg-gray-800 text-white hover:text-white hover:bg-gray-900 hover:border-gray-800 focus:ring focus:ring-gray-500 focus:ring-opacity-50 active:bg-gray-700 active:border-gray-700 cursor-pointer" target="_blank">                
              <span>My Resume</span>
            </a>
          </div>
          <!-- END Action -->
        </div>
      </div>
      <div class="flex items-center lg:justify-end text-blue-500">
        <!-- <svg viewBox="0 0 753 480.951" xmlns="http://www.w3.org/2000/svg" class="w-full"><path d="M149.18 480.567l-2-.039a463.833 463.833 0 017.1-66.287c8.648-46.88 23.029-77.67 42.743-91.512l1.148 1.637C152.12 356.7 149.203 479.332 149.18 480.567zM174.18 480.089l-2-.04c.043-2.214 1.293-54.413 21.843-68.841l1.148 1.637c-19.72 13.845-20.981 66.711-20.991 67.244z" fill="#2f2e41"></path><circle cx="209.549" cy="314.548" r="10" fill="currentColor"></circle><circle cx="204.597" cy="400.548" r="10" fill="currentColor"></circle><path d="M169.519 330.542c1.879 12.004-3.02 22.74-3.02 22.74s-7.945-8.725-9.824-20.729 3.019-22.74 3.019-22.74 7.945 8.725 9.825 20.73zM202.206 359.696c-11.493 3.942-22.919.99-22.919.99s7.208-9.344 18.7-13.287 22.92-.99 22.92-.99-7.208 9.345-18.701 13.287zM202.575 435.857a31.135 31.135 0 01-16.064.694 28.374 28.374 0 0129.172-10.006 31.134 31.134 0 01-13.108 9.312z" fill="#2f2e41"></path><path fill="#9e616a" d="M606.671 467.453h-13.14l-6.251-50.685 19.394.001-.003 50.684z"></path><path d="M610.023 480.19h-42.37v-.537a16.493 16.493 0 0116.491-16.491h.001l25.878.001z" fill="#2f2e41"></path><path fill="#9e616a" d="M525.57 467.453h-13.141l-6.251-50.685 19.394.001-.002 50.684z"></path><path d="M528.921 480.19h-42.37v-.537a16.493 16.493 0 0116.491-16.491h.002l25.878.001z" fill="#2f2e41"></path><path d="M492.789 183.616l-18.2-2.812-5.88 9.464-63.272 16.129.172.872a11.904 11.904 0 102.587 12.31l76.625-15.982zM674.554 172.347a11.855 11.855 0 00-4.375.841l.363-.633-80.444-41.58-10.967 17.73 83.635 37.125a11.9 11.9 0 1011.788-13.483z" fill="#9e616a"></path><circle cx="736.071" cy="267.733" r="35.538" transform="rotate(-80.783 501.187 294.317)" fill="#2f2e41"></circle><circle cx="512.264" cy="70.77" r="22.671" fill="#a0616a"></circle><ellipse cx="512.571" cy="48.405" rx="24.509" ry="14.705" fill="#2f2e41"></ellipse><circle cx="515.021" cy="22.671" r="14.705" fill="#2f2e41"></circle><path d="M495.414 14.705A14.707 14.707 0 01508.588.08a14.87 14.87 0 00-1.532-.08 14.705 14.705 0 000 29.41 14.87 14.87 0 001.532-.079 14.707 14.707 0 01-13.174-14.626zM500.478 127.051l1.828-17.576s24.806-16.347 33.236-6.686l50.388 86.213s31.323 11.136 30.216 53.658l-1.498 205.54-35.517 3.894-21.568-160.25-19.487 166.026-41.35-1.295 3.72-109.376 19.717-106.027-.188-35.182-8.684-14.199s-15.908-6.39-16.352-24.45l-.349-25.386z" fill="#2f2e41"></path><path d="M526.488 107.615l.49-8.24s75.031 19.773 69.079 33.91-17.113 18.6-17.113 18.6l-43.155-17.112zM506.88 128.117l-5.645-6.02s-45.032 63.188-31.414 70.248 25.052 3.354 25.052 3.354l22.228-40.757z" fill="#2f2e41"></path><path d="M416.745 333.873l282.56-56.404-23.613-118.297-282.561 56.404z" fill="#fff"></path><path d="M701.618 279.011l-286.416 57.174-24.384-122.152 286.417-57.173zm-283.33 52.55l278.705-55.635-22.844-114.441-278.706 55.634z" fill="#e4e4e4"></path><path fill="#e4e4e4" d="M427.715 242.718l228.672-45.647 1.19 5.962-228.672 45.647zM432.349 265.933l228.672-45.647 1.19 5.962-228.672 45.647zM437.01 289.282l228.672-45.647 1.19 5.962L438.2 295.244z"></path><path d="M547.129 234.12l-7.998 1.597a2.25 2.25 0 01-2.643-1.764l-3.781-18.942a2.25 2.25 0 011.763-2.643l7.998-1.597a2.25 2.25 0 012.643 1.764l3.781 18.942a2.25 2.25 0 01-1.763 2.643zM638.227 240.075l-7.998 1.597a2.25 2.25 0 01-2.643-1.764l-3.78-18.942a2.25 2.25 0 011.763-2.643l7.997-1.597a2.25 2.25 0 012.643 1.764l3.781 18.942a2.25 2.25 0 01-1.763 2.643zM588.893 274.202l-7.997 1.597a2.25 2.25 0 01-2.643-1.763l-3.782-18.943a2.25 2.25 0 011.764-2.643l7.998-1.597a2.25 2.25 0 012.643 1.764l3.78 18.942a2.25 2.25 0 01-1.763 2.643z" fill="currentColor"></path><path d="M752 480.951H1a1 1 0 010-2h751a1 1 0 010 2z" fill="#cacaca"></path></svg>         -->
        <img :src="imagePath" alt="Image" />
      </div>
    </div>
  </header>
  <!-- End Header -->

    <!-- Portfolio Section -->
  <section id="portfolio" class="bg-white">
    <div class="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-4">
      <div class="text-center">
        <h2 class="text-3xl md:text-4xl font-extrabold mt-11">
          Projects
        </h2>
      </div>
    
      <!-- PORTFOLIO -->
      <div v-if="loading"  class="flex justify-center">
        <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div v-else  class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 opacity-0 animate-fade-in-down">
          <div v-if="projects.length === 0" class="p-2.5 xl:p-5">
            <p class="font-semibold text-sm leading-5 text-gray-700">No Project Available!!!</p>
          </div>  
   
          <div v-else v-for="(project, ind) in projects" :key="project._id" class="p-5 bg-gray-100 border-2 border-white shadow-sm hover:border-indigo-700 transition rounded-lg animate-fade-in-down"  :style="{animationDelay: `${ind * 0.1}s`}">            
            <img :src="project.imageUrl" class="w-full h-40 object-cover">
            <h4 class="text-lg font-bold mb-2">
            {{project.title}}
            </h4>
            <div class="flex">
              <span>Category : </span><span class="font-semibold ml-2">{{project.category.name}}</span>
            </div>
           
            <p class="leading-relaxed font-medium text-gray-600">{{ truncateDescription(project.description, 100) }}</p>
            <a :href="project.url" class="mt-2 inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded border-blue-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-blue-800 focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700" target="_blank">
                <span>Live url</span>
            </a>
           
            <a :href="project.url" class="mt-2 inline-flex justify-end items-center space-x-2 text-sm font-semibold focus:outline-none px-3 py-2 leading-6 text-gray-800" target="_blank">
              <span>More Details</span>
          </a>
          </div>
        
      </div>          

    </div>
  </section>
 <!-- End Portfolio -->

  <!-- About Section: Simple -->
  <section id="about" class="bg-white">
    <div class="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-4"><!--32-->
      
      <div class="text-center">
        <h2 class="text-3xl md:text-4xl font-extrabold mt-11">
          About Me
        </h2>
      </div>
      <div class="text-center">
        <h3 class="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-2/3 mx-auto">
          I am a software engineer with over 5+ years of experience in crafting exceptional user experiences through codes with tools like: Python(Django), Nodejs, Vuejs, NuxtJs, PHP(Laravel), Tailwind CSS, Apis, Mysql, Mogodb.
          In addition to my web development expertise, I am also venturing into the exciting realm of AI. I am currently exploring the vast possibilities offered by Google Vertex AI, OpenAI APIs and Azure AI.
          These cutting-edge platforms enable me to leverage the power of artificial intelligence and machine learning to create intelligent and efficient solutions.
        </h3>
        <footer class="mt-4">
          <a href="#" class="block mx-auto rounded-full overflow-hidden w-20 h-20 transform transition ease-out duration-150 border-2 border-gray-50 hover:border-white hover:shadow-md hover:scale-125 active:border-gray-50 active:shadow-sm active:scale-110">
            <img src="https://lh3.googleusercontent.com/a/AAcHTtfzX9Ny9Y5dpsP3i060Z_p1TYLoxHjlb2N1a5GgbA=s288-c-no" alt="Avatar Photo">
          </a>
          <div>
            <a href="#" class="text-lg font-semibold text-indigo-700">
             Gedoni Ani
            </a>
            <div class="mx-auto w-10 h-1 my-1 rounded-lg bg-blue-200"></div>
            <p class="text-gray-500 font-medium">
              FullStack Web Developer
            </p>
          </div>
        </footer>
      </div>

    </div>
  </section>
 <!-- End About Section -->

  <!-- Contact Section -->
  <div id="contact" class="flex flex-col mx-auto w-full min-h-screen sm:min-w-[320px] bg-white">
    <!-- Page Content -->
    <main  class="flex flex-auto flex-col max-w-full lg:mt-20">
      <div class="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto lg:p-10 -mt-10 w-full">
        <!-- contact Section -->
        <section class="-mt-20 w-full max-w-xl">
          <!-- Header -->
          <header class="mb-10 text-center">
            <h2 class="text-3xl md:text-4xl font-extrabold mt-11">
              <span>Contact</span>
            </h2>
            <h2 class="text-sm font-medium text-indigo-700">
              Hello, Drop a message below
            </h2>
          </header>
          <!-- END Header -->
    
          <!-- Contact Form -->
          <div class="flex flex-col rounded-lg shadow-sm bg-gray-100 overflow-hidden">
            <div class="p-5 md:px-16 md:py-12 grow">
              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="space-y-1">
                  <label for="name" class="text-sm font-medium">Name</label>
                  <input type="text" v-model="name" id="name" name="name" placeholder="Enter Your Name" class="w-full block border placeholder-gray-500 px-5 py-3 leading-6 rounded-lg border-indigo-700 focus:border-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                </div>
                <div class="space-y-1">
                  <label for="email" class="text-sm font-medium">Email</label>
                  <input type="email" v-model="email" id="email" name="email" placeholder="Enter Your Email" class="w-full block border placeholder-gray-500 px-5 py-3 leading-6 rounded-lg border-indigo-700 focus:border-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                </div>                                    
                <div class="space-y-1">
                  <label for="Message" class="text-sm font-medium">Message</label>
                  <textarea  id="message" v-model="message" name="message" placeholder="Drop A Message" class="w-full block border placeholder-gray-500 px-5 py-3 leading-6 rounded-lg border-indigo-700 focus:border-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"></textarea>
                </div>                  
                <div>                                       
                  <button type="submit" class="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 border-indigo-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-600 hover:border-indigo-600 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700 dark:focus:ring-indigo-400 dark:focus:ring-opacity-90">
                    <svg class="hi-mini hi-arrow-uturn-right inline-block w-5 h-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z" clip-rule="evenodd"/></svg>
                    <span>Send</span>
                  </button>
                </div>
              </form>
            </div>        
          </div>
          <!-- END Contact Form -->
        </section>
        <!-- END Contact Section -->
      </div>
    </main>
    <!-- END Page Content -->
  </div>
  <!-- End Contact Section -->



 

  <!-- Page Footer -->
  <footer id="page-footer" class="flex flex-none items-center bg-gray-200 mt-10">
    <div class="text-center flex flex-col md:text-left md:flex-row md:justify-between text-sm container xl:max-w-7xl mx-auto px-4 lg:px-8">
      <div class="pt-4 pb-1 md:pb-4">
        <a href="#" class="font-semibold hover:text-indigo-700 focus:outline-none" target="_blank">Gedoni Ani</a> © 2024
      </div>
      <div class="pb-4 pt-1 md:pt-4 inline-flex items-center justify-center">
        <a href="https://www.linkedin.com/in/gedonidev/" class="hover:text-indigo-700" target=_blank>
          <svg fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-143 145 512 512" xml:space="preserve" class="mx-2 inline-block w-4 h-4"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7 c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4 c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8 c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4 c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"></path> <rect x="-8.5" y="348.4" width="49.9" height="159.7"></rect> <path d="M15.4,273c-18.4,0-30.5,11.9-30.5,27.7c0,15.5,11.7,27.7,29.8,27.7h0.4c18.8,0,30.5-12.3,30.4-27.7 C45.1,284.9,33.8,273,15.4,273z"></path> <path d="M177.7,346.9c-28.6,0-46.5,15.6-49.8,26.6v-25.1H71.8c0.7,13.3,0,159.7,0,159.7h56.1v-86.3c0-4.9-0.2-9.7,1.2-13.1 c3.8-9.6,12.1-19.6,27-19.6c19.5,0,28.3,14.8,28.3,36.4v82.6H241v-88.8C241,369.9,213.2,346.9,177.7,346.9z"></path> </g> </g></svg>
        </a>
        <a href="https://github.com/gedons/" class="hover:text-indigo-700" target="_blank">
            <svg fill="currentColor" class="mx-2 inline-block w-4 h-4" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#142]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g></svg>
        </a>
        <a href="https://twitter.com/AniGedoni" class="hover:text-indigo-700" target="_blank">
          <svg fill="currentColor"  class="mx-2  inline-block w-4 h-4" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-143 145 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7 c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4 c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8 c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4 c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"></path> <path d="M234.3,313.1c-10.2,6-21.4,10.4-33.4,12.8c-9.6-10.2-23.3-16.6-38.4-16.6c-29,0-52.6,23.6-52.6,52.6c0,4.1,0.4,8.1,1.4,12 c-43.7-2.2-82.5-23.1-108.4-55c-4.5,7.8-7.1,16.8-7.1,26.5c0,18.2,9.3,34.3,23.4,43.8c-8.6-0.3-16.7-2.7-23.8-6.6v0.6 c0,25.5,18.1,46.8,42.2,51.6c-4.4,1.2-9.1,1.9-13.9,1.9c-3.4,0-6.7-0.3-9.9-0.9c6.7,20.9,26.1,36.1,49.1,36.5 c-18,14.1-40.7,22.5-65.3,22.5c-4.2,0-8.4-0.2-12.6-0.7c23.3,14.9,50.9,23.6,80.6,23.6c96.8,0,149.7-80.2,149.7-149.7 c0-2.3,0-4.6-0.1-6.8c10.3-7.5,19.2-16.7,26.2-27.3c-9.4,4.2-19.6,7-30.2,8.3C222.1,335.7,230.4,325.4,234.3,313.1z"></path> </g> </g></svg>
        </a>
      </div>
    </div>
  </footer>
  <!-- END Page Footer -->

    <!-- Scroll-to-Top Button -->
  <button
    v-show="isScrollToTopVisible"
    @click="scrollToTop"
    class="fixed bottom-20 right-5 border-none rounded-md" >
     <svg width="50px" height="40px" viewBox="0 0 24.000001 24.000001" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" class="text-indigo-700"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <filter id="a" color-interpolation-filters="sRGB" height="1.39486" width="1.311082" x="-.155541" y="-.19743"> <feGaussianBlur stdDeviation="1.2313672"></feGaussianBlur> </filter> <g transform="matrix(.96344673 0 0 .96344673 -123.36427 -955.289756)"> <path d="m132.5 995.4062c-.831 0-1.5 1.5-1.5 1.5s.669 1.5 1.5 1.5h7.6875c-.25613.088-.47997.2851-.59375.5313l-3 6c-.2396.5108.0576 1.1992.59375 1.375l1.8125.625v2.4375c.00005.5236.47642 1 1 1h1c.52358 0 .99995-.4764 1-1v-2.4375l1.8125-.625c.53611-.1758.83335-.8642.59375-1.375l-3-6c-.13219-.2754-.39056-.4647-.6875-.5313h7.78125c.831 0 1.5-1.5 1.5-1.5s-.669-1.5-1.5-1.5z" filter="url(#a)" opacity=".2"></path> <path d="m140.3125 997.375c-.31022.06-.58621.2757-.71875.5625l-3 6c-.2396.5108.0576 1.1992.59375 1.375l1.8125.625v2.4375c.00005.5236.47642 1 1 1h1c.52358 0 .99995-.4764 1-1v-2.4375l1.8125-.625c.53611-.1758.83335-.8642.59375-1.375l-3-6c-.17625-.3672-.59466-.6026-1-.5625-.0312-.001-.0625-.001-.0937 0z"></path> <path d="m140.5 998.375-3 6 2.5.8437v3.1563h1v-3.1563l2.5-.8437z" fill="#fefefe"></path> <g transform="rotate(-90)"> <rect height="18.999969" rx="1.43934" ry="1.5" width="3.049988" x="-997.41217" y="131.00003"></rect> <path d="m-996.41217 132.00003h1v16.999969h-1z" fill="#fefefe"></path> </g> </g> </g></svg>
   </button>
  <!-- End Scroll-to-Top Button  -->
</template>

<script>
import VueScrollTo  from 'vue-scrollto';
import axios from 'axios';
import { inject } from '@vercel/analytics';
import api from '../api';
 
// import {useToast} from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-sugar.css';


export default {
data() {
  return {
    isOpen: false,
    isScrollToTopVisible: false,
    text1: "Hi, I Am Gedoni Ani",
    typedText1: '',
    index:0,
    name: '',
    email: '',
    message: '',
    imagePath: 'https://www.dropbox.com/scl/fi/x06urdx5elij4krlpgq09/Banner.png?rlkey=mu9ad9kly2illt0ovt4xoh0gs&raw=1' ,
    loading: true,
    categories: [],
    projects: [],
  }
},

created() {          
  this.fetchCategories();
  this.fetchProjects();
  },


methods: {
  typeText1() {
    if (this.index < this.text1.length) {
      this.typedText1 += this.text1.charAt(this.index);
      this.index++;
      setTimeout(this.typeText1, 100); // Adjust the typing speed (in milliseconds) here
    }
  },

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

  truncateDescription(description, maxLength) {
      if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
      } else {
        return description;
      }
    },

  submitForm() {
 
  },

  saveFormData(formData) {

  },

scrollToSection(selector) {
    VueScrollTo.scrollTo(selector, 500, {
      easing: 'ease-in',
    });
  },
  scrollToTop() {
    VueScrollTo.scrollTo('#home', 500, {
      easing: 'ease-in',
    });
  },
  toggleScrollToTopButtonVisibility() {
    this.isScrollToTopVisible = window.scrollY > 300;
  },

},

mounted() {
  inject();
  this.typeText1();
  // this.typeText2();
  window.addEventListener('scroll', this.toggleScrollToTopButtonVisibility);
},
beforeUnmount() {
  window.removeEventListener('scroll', this.toggleScrollToTopButtonVisibility);
},

}
</script>


