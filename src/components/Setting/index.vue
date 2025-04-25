<template>
  <div
    class="h-50px w-50px cursor-pointer flex justify-center items-center hover:bg-gray-200"
    @click="handleSetting"
  >
    <SvgIcon icon-name="ep:setting" custom-class="size-1.5em"></SvgIcon>
  </div>
  <Drawer v-model="isShow" title="系统设置">
    <div class="flex flex-col">
      <el-switch v-model="logoVisiable" active-text="是否显示系统logo" />
      <el-switch v-model="tagViewsVisiable" active-text="是否显示标签导航" />
    </div>
  </Drawer>
</template>

<script lang="ts" setup>
import { useSetting } from "@/stores/setting";
const store = useSetting();
const { setLogoStatus, setTagViewsStatus } = store;

const logoVisiable = computed({
  get() {
    return store.setting.logoVisiable;
  },
  set(value) {
    setLogoStatus(value);
  }
});

const tagViewsVisiable = computed({
  get() {
    return store.setting.tagViewsVisiable;
  },
  set(value) {
    setTagViewsStatus(value);
  }
});
const isShow = ref(false);
const handleSetting = () => {
  isShow.value = true;
};
</script>
