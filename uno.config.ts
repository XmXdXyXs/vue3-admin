import { defineConfig } from "unocss";
import presetAttributify from "unocss/preset-attributify";
import preseUno from "unocss/preset-uno";
import transformerDirectives from "@unocss/transformer-directives";

export default defineConfig({
  presets: [presetAttributify(), preseUno()],
  transformers: [transformerDirectives()], // apply 写法
  shortcuts: [
    // 快捷类名
    [
      "icon",
      "inline-block w-1em h-1em align-middle text-current overflow-hidden"
    ]
  ]
});
