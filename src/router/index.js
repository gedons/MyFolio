import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Index from "../views/Index.vue";
import Admin from "../views/Admin/Index.vue";
import Project from "../views/Admin/Project.vue";
import ProjectView from "../views/Admin/ProjectView.vue";
import Ablog from "../views/Admin/ABlog.vue";
import ABlogView from "../views/Admin/ABlogView.vue";
import Message from "../views/Admin/Message.vue";
import Login from "../views/Login.vue";
import Blog from "../views/Blog.vue";
import NotFound from "../views/NotFound.vue";

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
    // Admin Project
    { path: "/admin/projects", name: "Project", component: Project, meta: { requiresAuth: true }, },    
    { path: "/admin/message", name: "Message", component: Message, meta: { requiresAuth: true }, },
    { path: "/admin/project/create", name: "ProjectCreate", component: ProjectView, meta: { requiresAuth: true }, },
    { path: "/admin/project/:id", name: "ProjectView", component: ProjectView, meta: { requiresAuth: true }, },

    // Admin Blog
    { path: "/admin/blog", name: "Ablog", component: Ablog, meta: { requiresAuth: true }, },
    { path: "/admin/blog/create", name: "ABlogCreate", component: ABlogView, meta: { requiresAuth: true }, },
    { path: "/admin/blog/:id", name: "ABlogView", component: ABlogView, meta: { requiresAuth: true }, },

    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {isGuest: true},
    },

    {
      path: "/blog",
      name: 'Blog',
      component: Blog
    },

    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach((to, from, next) => {    
    const isUserLoggedIn = store.getters['isUserAuthenticated'];
  
    const isUserRoute = to.matched.some((record) => record.meta.isUser);
  
    if (isUserRoute && !isUserLoggedIn) {
      // Redirect if user route and not logged in as user
      next('/login');
    } else {
      next(); // Proceed to the route
    }
  });

export default router;