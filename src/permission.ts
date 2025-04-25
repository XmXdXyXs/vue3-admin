import router from "@/router";
import nProgress from "nprogress";
import type { RouteLocationNormalized } from "vue-router"; // 引入类型定义
import "nprogress/nprogress.css";

import { getToken } from "@/utils/auth";
const whiteList: string[] = ["/login"]; // ⽩名单
nProgress.configure({ showSpinner: false });
router.beforeEach((to: RouteLocationNormalized) => {
  nProgress.start();
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      return {
        path: "/",
        replace: true
      };
    }
    nProgress.done();
    return true;
  } else {
    if (whiteList.includes(to.path)) {
      nProgress.done();
      return true;
    }
    return {
      path: "/login",
      query: {
        redirect: to.path,
        ...to.query
      }
    };
  }
});
