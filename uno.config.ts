import { defineConfig } from "unocss"
import presetAttributify from "unocss/preset-attributify"
import preseUno from "unocss/preset-uno"
import transformerDirectives from "@unocss/transformer-directives"

export default defineConfig({
  presets: [presetAttributify(), preseUno()],
  transformers: [transformerDirectives()] // apply 写法
})
