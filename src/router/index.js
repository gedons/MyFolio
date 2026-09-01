import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import AdminLayout from "../admin/AdminLayout.vue";
import AdminLogin from "../admin/AdminLogin.vue";
import DashboardView from "../admin/DashboardView.vue";
import ProjectsView from "../admin/ProjectsView.vue";
import MessagesView from "../admin/MessagesView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index
  },
  {
    path: "/privacy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin
  },
  {
    path: "/login",
    redirect: "/admin/login"
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/admin/dashboard"
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: DashboardView
      },
      {
        path: "projects",
        name: "AdminProjects",
        component: ProjectsView
      },
      {
        path: "messages",
        name: "AdminMessages",
        component: MessagesView
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('admin_token');
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !token) {
    next('/admin/login');
  } else if (to.path === '/admin/login' && token) {
    next('/admin/dashboard');
  } else {
    next();
  }
});

export default router;