<template>
  <el-dialog v-model="dialogVisible" title="添加角色" width="500">
    <div class="editor-container" p-20px>
      <el-form
        ref="editFormRef"
        :model="editData"
        :rules="menuFormRules"
        label-width="100px"
      >
        <el-form-item label="⻆⾊名称" prop="name">
          <el-input v-model="editData.name" placeholder="请输⼊⻆⾊名称" />
        </el-form-item>
        <el-form-item label="说明" prop="description">
          <el-input v-model="editData.description" placeholder="请输⼊说明" />
        </el-form-item>
        <el-form-item label="是否默认⻆⾊" prop="is_default">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="editData.is_default"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="submitMenuForm" :loading="loading"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { IRole } from "@/modal/roleModal";
import { ElForm } from "element-plus";
type FormInstance = InstanceType<typeof ElForm>;
const emit = defineEmits(["update:modelValue", "handleAddRole"]);

const editData = ref({
  name: "",
  description: "",
  is_default: 0
});

const menuFormRules = {
  name: {
    required: true,
    message: "请输⼊⻆⾊名称",
    trigger: "blur"
  },
  description: {
    required: true,
    message: "请输⼊说明",
    trigger: "blur"
  }
};

const { modelValue } = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "add"
  },
  rowItem: {
    type: Object as PropType<IRole>,
    default: () => {
      return {
        id: 0,
        name: "",
        description: "",
        is_default: 0,
        createdAt: "",
        updatedAt: ""
      };
    }
  }
});

const loading = ref<boolean>(false);
const editFormRef = useTemplateRef<FormInstance | null>("editFormRef");
// 提交表单
const submitMenuForm = () => {
  if (loading.value) return; // 防⽌重复提交
  loading.value = true;
  (editFormRef.value as FormInstance).validate((valid) => {
    if (valid) {
      emit("handleAddRole", editData.value);
    }
    loading.value = false;
  });
};
const dialogVisible = computed({
  get() {
    return modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  }
});
</script>
