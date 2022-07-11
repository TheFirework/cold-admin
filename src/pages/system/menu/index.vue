<template>
  <el-card>
    <template #header>
      <el-button type="primary" :icon="Refresh" @click="queryMenuList">刷新</el-button>
      <el-button type="primary" @click="handleCreate">新增</el-button>
    </template>
    <el-table :data="list" :tree-props="{ children: 'children' }" border default-expand-all row-key="id" size="mini">
      <el-table-column align="left" label="名称" prop="title" width="260"/>
      <el-table-column align="left" label="标识" prop="name" width="260"/>
      <el-table-column align="center" label="图标" prop="icon" width="100">
        <template #default="scope">
          <icon-svg v-if="scope.row.icon" :name="scope.row.icon"/>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="菜单显示"
          prop="isShow"
          width="100"
      >
        <template #default="scope">
          <div>
            <i v-if="scope.row.isShow === 1" class="el-icon-check"></i>
            <i v-else class="el-icon-close"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型" prop="type" width="100">
        <template #default="scope">
          <el-tag effect="dark">{{ typeOptions[scope.row.type] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="节点路由"
          prop="url"
          width="240"
      />
      <el-table-column
          align="center"
          label="路由缓存"
          prop="keepAlive"
          width="100"
      >
        <template #default="scope">
          <div v-if="scope.row.type === 1">
            <i v-if="scope.row.keepAlive === 1" class="el-icon-check"></i>
            <i v-else class="el-icon-close"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="文件路径"
          prop="viewPath"
          show-overflow-tooltip
      />
      <el-table-column align="center" fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button size="mini" type="text" @click="handleCreateToRaw(scope.row.id)">新增</el-button>
          <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="dialogFormVisible"
        :close-on-click-modal="false"
        :title="dialogTitleMap[dialogStatus]"
        style="width: 960px"
    >
      <el-form ref="dataForm" :model="temp" :rules="rules" label-width="100px">
        <el-form-item label="节点类型" prop="type">
          <el-radio-group v-model="temp.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="节点名称" prop="name" required>
          <el-input v-model="temp.title" placeholder="请输入节点名称"></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="name" required>
          <el-input v-model="temp.name" placeholder="请输入标识名称"></el-input>
        </el-form-item>
        <el-form-item label="上级节点" prop="parentId">
          <menu-tree v-model:value="temp.parentId" :menuList="menuList"/>
        </el-form-item>
        <el-form-item label="节点路由" prop="router">
          <el-input v-model="temp.url" placeholder="请输入节点路由"/>
        </el-form-item>
        <el-form-item v-if="temp.type === 1" label="路由缓存" prop="keepAlive">
          <el-radio-group v-model="temp.keepAlive">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单显示" prop="isShow">
          <el-radio-group v-model="temp.isShow">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="temp.type === 1" label="文件路径" prop="viewPath">
          <menu-file-path v-model:value="temp.viewPath" placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="节点图标" prop="icon">
          <menu-icons v-model:value="temp.icon"/>
        </el-form-item>
        <el-form-item label="排序号" prop="orderNo">
          <el-input v-model="temp.orderNo" placeholder="请输入排序号"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false"> 取消</el-button>
        <el-button
            type="success"
            @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name:'menu'
}
</script>
<script setup>
import {ref} from "vue";
import MenuService from "../../../api/menu";
import {Refresh} from '@element-plus/icons-vue';
import {deepTree} from "../../../core/utils/array";
import  {ElMessage,ElMessageBox,ElNotification} from "element-plus";

const typeOptions = {
  0: '目录',
  1: '菜单'
}
const dialogTitleMap = {
  update: '编辑',
  create: '新增'
}
const dataForm = ref(null)
const list = ref([])
const menuList = ref([])
let dialogFormVisible = ref(false)
const dialogStatus = ref('')
const temp = ref({
  type: 0,
  title: "",
  name: "",
  parentId: "",
  isShow: 1,
  icon: "",
  url: "",
  keepAlive: 1,
  viewPath: "",
})
const rules = ref({
  title: [{required: true, message: "节点名称必须", trigger: "blur"}],
  name: [{required: true, message: "标识必须", trigger: "blur"}],
})


const queryMenuList = async () => {
  const result = await MenuService.getMenuList()
  if (result.code === 200) {
    menuList.value = result.data
    list.value = deepTree(result.data);
  }
}

const resetTemp = () => {
  temp.value = {
    type: 0,
    name: "",
    title: "",
    parentId: "",
    isShow: 1,
    icon: "",
    url: "",
    keepAlive: 1,
    viewPath: "",
  }
}

const handleCreate = () => {
  resetTemp()
  dialogStatus.value = 'create'
  dialogFormVisible.value = true
}
const handleCreateToRaw = (parentId) => {
  resetTemp();
  temp.value.parentId = parentId;
  dialogStatus.value = "create";
  dialogFormVisible.value = true;
}
const handleEdit = (row) => {
  temp.value = Object.assign({}, row);
  row.value.isShow = !!row.isShow
  dialogStatus.value = "update";
  dialogFormVisible.value = true;
}

const createData = () => {
  dataForm.value.validate(async (valid) => {
    if (valid) {
      temp.value.isShow = temp.value.isShow ? 1 : 0
      const result = await MenuService.saveMenu(temp.value)
      if (result.code === 10000) {
        queryMenuList()
        dialogFormVisible.value = false;
        ElNotification({
          title: "权限",
          message: "创建成功",
          type: "success",
          duration: 2000,
        });
      }

    }
  });
}
const updateData = () => {
  dataForm.value.validate(async (valid) => {
    if (valid) {
      temp.value.isShow = temp.value.isShow ? 1 : 0
      const result = await MenuService.saveMenu(temp.value)
      if (result.code === 10000) {
        queryMenuList()
        state.dialogFormVisible = false;
        ElNotification({
          title: "权限",
          message: "更新完成",
          type: "success",
          duration: 2000,
        });
      }
    }
  });
}
const handleDelete = (row) => {
  ElMessageBox.confirm(`是否删除 ${row.name}？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then(async () => {
        const result = await MenuService.deleteMenu({id: row.id})
        if (result.code === 10000) {
          queryMenuList()
          ElMessage.success("删除成功!");
        }
      })
      .catch(() => {
        console.log("已取消删除");
      });
}

queryMenuList()
</script>

<style lang="scss" scoped></style>