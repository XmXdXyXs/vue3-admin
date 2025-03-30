import { defineConfig } from "eslint/config"
import globals from "globals"
import js from "@eslint/js" // 校验js规范
import tseslint from "typescript-eslint" // 推荐的ts规范
import pluginVue from "eslint-plugin-vue" // 推荐的vue的规范
import prettierRecommended from "eslint-plugin-prettier/recommended"

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    plugins: { js },
    extends: ["js/recommended"]
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  {
    // 那些文件不需要eslint去校验
    ignores: [".css", "*.d.ts"]
  },
  {
    // 自定义规则, 根据需要增加 eslint 主要是校验代码规范 prettier 主要用于格式化代码
    rules: {
      "no-console": "warn"
    }
  },
  prettierRecommended // 覆盖掉eslint的规则
])
