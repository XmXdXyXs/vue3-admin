import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

// 私有路由
const privateRouter: RouteRecordRaw[] = [];
// 公共路由
const publicRouter: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      hidden: true
    }
  },
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
          // noCache: true // 页面是否开启不缓存
        }
      },
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/Redirect/index.vue"),
        meta: {
          hidden: true
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
      name: "MenuCenter"
    },
    meta: {
      icon: "ant-design:book-filled",
      title: "系统中心",
      alwaysShow: true // 用于判断主导航是否一直显示
    },
    children: [
      {
        path: "menu",
        name: "MenuCenter",
        component: () => import("@/views/System/menu/index.vue"),
        meta: {
          icon: "ant-design:book-filled",
          title: "菜单中心",
          hidden: false
        }
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/System/role/index.vue"),
        meta: {
          icon: "ant-design:book-outlined",
          title: "角色权限",
          hidden: false,
          breadcrumb: true // 用于判断面包屑导航是否一直存在
        }
      },
      {
        path: "user",
        name: "User",
        meta: {
          icon: "ant-design:book-twotone",
          title: "用户中心",
          hidden: false
        },
        component: () => import("@/views/System/user/index.vue")
      }
    ]
  }
];
export const routes: RouteRecordRaw[] = [...publicRouter, ...privateRouter];

export default createRouter({
  routes,
  history: createWebHistory()
});
