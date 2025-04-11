<template>
  <div>
    <el-drawer v-model="drawerVisiable" :title="title" :direction="direction">
      <slot></slot>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
const enum DrawerType {
  rtl = "rtl",
  ltr = "ltr",
  ttb = "ttb",
  btt = "btt"
}
const { modelValue, title } = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  },
  direction: {
    type: String as PropType<DrawerType>,
    default: "rtl"
  }
});

const emit = defineEmits(["update:modelValue"]);

const drawerVisiable = computed({
  get() {
    return modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});
</script>

<style scoped></style>
