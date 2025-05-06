<template>
  <div>
    <div class="flex justify-end mb-16px">
      <el-button
        type="primary"
        @click="
          addRoleVisiable = true;
          roleType = 'add';
        "
      >
        <el-icon><Plus /></el-icon>新增角色</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="80" label="序号" />
      <el-table-column prop="id" label="角色id" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="description" label="角色描述" />
      <el-table-column
        prop="is_default"
        label="是否默认⻆⾊"
        :formatter="formatter"
      >
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template #default="{ row }">
          <span>{{ dayjs(row.createdAt).format("YYYY/MM/DD HH:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间">
        <template #default="{ row }">
          <span>{{ dayjs(row.updatedAt).format("YYYY/MM/DD HH:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleRoleEdit(row)"
            >编辑</el-button
          >
          <el-popconfirm
            icon-color="red"
            confirm-button-text="确认"
            cancel-button-text="取消"
            title="确认要删除此角色吗？"
            @confirm="deleteRole(row)"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-end mt-16px">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageData.pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="sizes, prev, pager, next, jumper, total"
        :total="state.count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <AddEditRole
      v-model="addRoleVisiable"
      @handleAddRole="handleAddRole"
      :roleType="roleType"
      :rowItem="rowItem"
    />
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { Plus } from "@element-plus/icons-vue";
import { useRoleStore } from "@/stores/role.ts";
import type { IRole } from "@/modal/roleModal";

defineOptions({
  name: "Role"
});

const store = useRoleStore();
const { state } = storeToRefs(store);
const tableData = ref<IRole[]>([]);
const addRoleVisiable = ref<boolean>(false);
const roleType = ref<string>("add");
const rowItem = ref<IRole>({
  id: 0,
  name: "",
  description: "",
  is_default: 0,
  createdAt: "",
  updatedAt: ""
});

const { proxy } = getCurrentInstance()!;

const pageData = reactive({
  pageNum: 0,
  pageSize: 10
});

const currentPage = computed(() => pageData.pageNum + 1 || 0);

const formatter = (row: IRole) => {
  return row.is_default ? "是" : "否";
};

const handleSizeChange = (val: number) => {
  pageData.pageSize = val;
  getRolesData();
};

const handleCurrentChange = (val: number) => {
  pageData.pageNum = val - 1;
  getRolesData();
};

const getRolesData = async () => {
  await store.getRoles({ ...pageData });
};

const handleAddRole = async (role: IRole) => {
  await store.addRole({ ...pageData, ...role });
  proxy?.$message({
    message: "添加成功",
    type: "success"
  });
  addRoleVisiable.value = false;
};

const deleteRole = async (role: IRole) => {
  await store.removeRole({ ...role, ...pageData });
  proxy?.$message({
    message: "删除成功",
    type: "success"
  });
};

const handleRoleEdit = (row: IRole) => {
  addRoleVisiable.value = true;
  roleType.value = "edit";
  rowItem.value = { ...row };
};

watchEffect(() => {
  tableData.value = state.value.roles || [];
});
onMounted(() => {
  getRolesData();
});
</script>
