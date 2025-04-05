import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

// 私有路由
const privateRouter: RouteRecordRaw[] = [];
// 公共路由
const publicRouter: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: {
      name: "Dashboard"
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          icon: "ant-design:home-outlined",
          title: "个人中心"
        }
      }
    ]
  },
  {
    path: "/home",
    component: Layout,
    redirect: {
      name: "HomeCenter"
    },
    children: [
      {
        path: "/homeCenter",
        name: "HomeCenter",
        component: () => import("@/views/homeCenter/index.vue"),
        meta: {
          icon: "ant-design:bank-filled",
          title: "首页"
        }
      }
    ]
  },
  {
    path: "/about",
    component: Layout,
    redirect: {
      name: "AboutCenter"
    },
    children: [
      {
        path: "/centerCenter",
        name: "AboutCenter",
        component: () => import("@/views/AboutCenter/index.vue"),
        meta: {
          icon: "ant-design:copy-outlined",
          title: "关于页面"
        }
      }
    ]
  },
  {
    path: "/content",
    component: Layout,
    redirect: {
      name: "ContentPageOne"
    },
    meta: {
      icon: "ant-design:book-filled",
      title: "内容中心"
    },
    children: [
      {
        path: "/contentPageOne",
        name: "ContentPageOne",
        component: () => import("@/views/ContentCenter/index.vue"),
        meta: {
          icon: "ant-design:book-filled",
          title: "内容中心1"
        }
      },
      {
        path: "/contentPageTwo",
        name: "ContentPageTwo",
        component: () => import("@/views/ContentCenter/content2.vue"),
        meta: {
          icon: "ant-design:book-outlined",
          title: "内容中心2"
        }
      },
      {
        path: "/contentPageThree",
        name: "ContentPageThree",
        component: () => import("@/views/ContentCenter/content3.vue"),
        meta: {
          icon: "ant-design:book-twotone",
          title: "内容中心3"
        }
      }
    ]
  }
];
export const routes: RouteRecordRaw[] = [...publicRouter, ...privateRouter];

export default createRouter({
  routes,
  history: createWebHistory()
});
