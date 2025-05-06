<template>
  <div>
    <div class="flex justify-end mb-16px">
      <el-button>
        <el-icon><Plus /></el-icon>新增角色</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="80" label="序号" />
      <el-table-column prop="id" label="角色id" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="description" label="角色描述" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column prop="updatedAt" label="更新时间" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small">编辑</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-end mt-16px">
      <el-pagination
        v-model:current-page="pageData.pageNum"
        v-model:page-size="pageData.pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="sizes, prev, pager, next, jumper, total"
        :total="state.count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoleStore } from "@/stores/role.ts";
import type { IRole } from "@/modal/roleModal";

const store = useRoleStore();
const { state } = storeToRefs(store);
const tableData = ref<IRole[]>([]);

const pageData = reactive({
  pageNum: 1,
  pageSize: 10
});

const handleSizeChange = (val: number) => {
  pageData.pageSize = val;
  getRolesData();
};

const handleCurrentChange = (val: number) => {
  pageData.pageNum = val;
  getRolesData();
};

const getRolesData = async () => {
  await store.getRoles({ ...pageData });
  tableData.value = state.value.roles;
};
onMounted(() => {
  getRolesData();
});
</script>
