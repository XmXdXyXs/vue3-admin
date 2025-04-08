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
        path: "dashboard",
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
        path: "homeCenter",
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
        path: "centerCenter",
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
    path: "/system",
    component: Layout,
    redirect: {
      name: "Menu"
    },
    meta: {
      icon: "ant-design:book-filled",
      title: "系统中心",
      alwaysShow: true // 用于判断主导航是否一直显示
    },
    children: [
      {
        path: "menu",
        name: "Menu",
        component: () => import("@/views/ContentCenter/index.vue"),
        meta: {
          icon: "ant-design:book-filled",
          title: "menu",
          hidden: false
        }
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/ContentCenter/content2.vue"),
        meta: {
          icon: "ant-design:book-outlined",
          title: "role",
          hidden: true
        }
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/ContentCenter/content3.vue"),
        meta: {
          icon: "ant-design:book-twotone",
          title: "user",
          hidden: true
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
