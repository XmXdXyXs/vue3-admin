import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import UnoCss from "unocss/vite";
// ⾃动导⼊
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  },
  server: {
    proxy: {
      "/dev-api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/dev-api/, "/api")
      },
      "/prod-api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/prod-api/, "/api")
      }
    }
  },

  plugins: [
    vue(),
    UnoCss(),
    // api
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router", "pinia"], // 无需再通过 import { ref } from 'vue' 导⼊ 直接使用就可以
      eslintrc: { enabled: false } // 给eslint生成的配置 只需要一次
    }),
    Components({
      // 默认只针对src/components⽬录实现⾃动导⼊ 解析组件
      resolvers: [ElementPlusResolver()],
      dirs: [
        "src/components",
        "src/layout/components",
        "src/views/**/components"
      ] // 所有的组件可以自己动态加载
    }),
    ElementPlus({})
  ]
});
