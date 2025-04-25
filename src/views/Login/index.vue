<template>
  <div
    class="flex w-full h-[100vh] login-containner justify-center items-center flex-col gap-[16px]"
  >
    <img class="w-200px" src="../../assets/element-plus-logo.svg" alt="logo" />
    <div
      class="w-500px h-230px bg-#fff pt-12px pb-16px px-24px box-border flex items-center rounded-4px"
    >
      <el-form
        class="w-full flex flex-col gap-[16px]"
        ref="form"
        :model="loginForm"
        :rules="loginRules"
      >
        <div class="flex justify-center items-center">
          <span class="text-24px font-bold">方法总比困难多</span>
        </div>
        <div>
          <el-form-item prop="username">
            <el-input
              placeholder="请输⼊⽤户名"
              v-model="loginForm.username"
              ref="username"
            >
              <template #prepend>
                <span class="svg-container">
                  <svg-icon icon-name="ant-design:user-outlined"></svg-icon>
                </span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输⼊密码"
              autocomplete="on"
              ref="password"
              show-password
              v-model="loginForm.password"
            >
              <template #prepend>
                <span class="svg-container">
                  <svg-icon icon-name="ant-design:lock-outlined"></svg-icon>
                </span>
              </template>
            </el-input>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-button
            type="primary"
            class="w-full"
            :loading="loading"
            @click="handleLogin"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
import { useTemplateRef } from "vue";

const loginFormRef = useTemplateRef<FormInstance>("form");

const passwordRef = useTemplateRef<HTMLInputElement>("password");
const usernameRef = useTemplateRef<HTMLInputElement>("username");
import { useStore } from "@/stores/user";
const store = useStore();

const loginState = reactive({
  loginForm: {
    username: "",
    password: ""
  },
  loginRules: {
    username: [
      {
        required: true,
        trigger: "blur",
        message: "请输⼊⽤户名！"
      }
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: "请输⼊密码！"
      }
    ]
  }
});

// 解构
const { loginForm, loginRules } = toRefs(loginState);
const loading = ref(false);

// 处理登录逻辑
const handleLogin = () => {
  loading.value = true;
  loginFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        await store.login(loginState.loginForm);
        loading.value = false;
      } catch (error) {
        loading.value = false;
      }
    }
  });
};

onMounted(() => {
  if (loginState.loginForm.username === "") {
    usernameRef.value?.focus();
  } else if (loginState.loginForm.password === "") {
    passwordRef.value?.focus();
  }
});
</script>

<style lang="scss" scoped>
.login-containner {
  background-image: url("@/assets/sign_bg.47eec442.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #b8e5f8;
  box-sizing: border-box;
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(0px);
}
</style>
