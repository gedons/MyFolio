import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Index from "../views/Index.vue";
import Admin from "../views/Admin/Index.vue";
import Project from "../views/Admin/Project.vue";
import Ablog from "../views/Admin/Blog.vue";
import Message from "../views/Admin/Message.vue";
import Login from "../views/Login.vue";
import Blog from "../views/Blog.vue";

const routes = [
    {
      path: "/",
      name: 'Index',
      component: Index
    },

    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: { requiresAuth: true },
    },
    { path: "/admin/project", name: "Project", component: Project, meta: { requiresAuth: true }, },
    { path: "/admin/blog", name: "Ablog", component: Ablog, meta: { requiresAuth: true }, },
    { path: "/admin/message", name: "Message", component: Message, meta: { requiresAuth: true }, },

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

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
      next({ name: "Login" });
    } else if (store.state.user.token && to.meta.isGuest) {
      next({ name: "Admin" });
    } else {
      next();
    }
  });

export default router;