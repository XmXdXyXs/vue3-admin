<template>
  <!-- 直接渲染已经有的svg -->
  <IconifyIcon
    :class="svgClass"
    :icon="iconName"
    v-if="!isExt"
    v-bind="$attrs"
  />
  <!-- 渲染外部链接的svg -->
  <div
    v-else
    :style="styleExternalIcon"
    :class="svgClass"
    inline-block
    bg-current
    v-bind="$attrs"
  ></div>
</template>
<script setup lang="ts">
import { isExternal } from "@/utils/validate";
import { Icon as IconifyIcon } from "@iconify/vue";
import { computed } from "vue";
// 1.接收属性，name和class
let { iconName, customClass } = defineProps<{
  iconName: string;
  customClass?: string;
}>();
// 2.判断是否是外联svg
const isExt = computed(() => isExternal(iconName));
// 3、是否增添⾃定义class
const svgClass = computed(() => (customClass ? `icon ${customClass}` : "icon"));
// 4. 如果iconClass是带协议的图标链接 则通过style css属性⽅式渲染
const styleExternalIcon = computed(() => ({
  mask: `url(${iconName}) no-repeat 50% 50%`,
  "-webkit-mask": `url(${iconName}) no-repeat 50%
50%`,
  "mask-size": "cover"
}));
</script>
