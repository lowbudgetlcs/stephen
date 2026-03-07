import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../composables/useAuth";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { public: true },
  },
  {
    path: "/",
    redirect: "/events",
  },
  {
    path: "/events",
    name: "events",
    meta: { requiresAuth: true },
    component: () => import("../views/EventsView.vue"),
  },
  // {
  //   path: "/events/:eventId",
  //   name: "event-detail",
  //   component: () => import("../views/EventDetailView.vue"),
  //   props: true,
  // },
  {
    path: "/players",
    name: "players",
    component: () => import("../views/PlayersView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.public) return true;

  const { username } = useAuth();

  // If no stored user, redirect to login
  if (!username.value) {
    return { name: "login" };
  }

  return true;
});

export default router;
