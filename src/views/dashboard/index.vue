<template>
  <div>
    <div class="text-red">
      <el-button @click="handleMessage">点击</el-button>
    </div>
    <SvgIcon
      icon-name="ant-design:caret-up-filled"
      custom-class="text-blue-500"
      @click="handleMessage"
    />
    <img :src="VueSvg" alt="" />
    <!--⽀持使⽤外链的形式引⼊ svg。例如：-->
    <SvgIcon
      custom-class="text-yellow-500"
      icon-name="https://zishui.oss-cn-beijing.aliyuncs.com/BugFilled.svg"
      @click="handleMessage"
    />
  </div>
</template>

<script lang="ts" setup>
import VueSvg from "@/assets/vue.svg?url";
const { proxy } = getCurrentInstance()!;
const handleMessage = () => {
  proxy?.$message({
    message: "恭喜你，这是一条成功消息",
    type: "success"
  });
};
</script>
