import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import Blog from "../views/Blog.vue";

const routes = [
    {
      path: "/",
      name: 'Index',
      component: Index
    },

    {
      path: "/login",
      name: "Login",
      component: Login,
    },

    {
      path: "/blog",
      name: 'Blog',
      component: Blog
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;