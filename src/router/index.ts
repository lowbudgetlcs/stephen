import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/",
    redirect: "/events",
  },
  {
    path: "/events",
    name: "events",
    component: () => import("../views/EventsView.vue"),
  },
  {
    path: "/events/:eventId",
    name: "event-detail",
    component: () => import("../views/EventDetailView.vue"),
    props: true,
  },
  {
    path: "/players",
    name: "players",
    component: () => import("../views/PlayersView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
