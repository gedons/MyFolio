import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Index from "../views/Index.vue";
import Admin from "../views/Admin/Index.vue";
import Projects from "../views/Admin/Projects.vue";
import AddProject from "../views/Admin/AddProject.vue";
import Login from "../views/Login.vue";
import Blog from "../views/Blog.vue";

const routes = [
    {
      path: "/",
      name: 'Index',
      component: Index
    },



    {
      path: "/admin/dashboard",
      name: "Admin",
      component: Admin,
      meta: {
        requiresAuth: true,
        isAdmin: true,
      },
    },

    {
      path: "/admin/projects",
      name: "Projects",
      component: Projects,
      meta: {
        requiresAuth: true,
        isAdmin: true,
      },
    },

    {
      path: "/admin/addproject",
      name: "AddProject",
      component: AddProject,
      meta: {
        requiresAuth: true,
        isAdmin: true,
      },
    },

    {
      path: "/login",
      name: "Login",
      component: Login
    },

    {
      path: "/blog",
      name: 'Blog',
      component: Blog
    },

    // {
    //   path: '/404',
    //   name: 'NotFound',
    //   component: NotFound
    // }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach((to, from, next) => {
    const isAdminLoggedIn = store.getters['isAdminAuthenticated'];
    const isAdminRoute = to.matched.some((record) => record.meta.isAdmin);
  
    if (isAdminRoute && !isAdminLoggedIn) {      
      next('/login');
    } else {
      next();  
    }
  });

export default router;