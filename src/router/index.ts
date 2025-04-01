import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: {
      name: "Dashboard"
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue")
      }
    ]
  }
];

export default createRouter({
  routes,
  history: createWebHistory()
});
