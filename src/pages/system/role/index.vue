<template>
  <el-card>
    <template #header>
      <el-row justify="space-between">
        <el-form inline class="card-header">
          <el-form-item>
            <el-input v-model="searchKey" clearable placeholder="请输入名称"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="handleCreate">新增</el-button>
        </div>
      </el-row>
    </template>

    <custom-table :data="list" :columns="columns" action showIndex @load="queryRoleList">
      <template #handler="scope">
        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete([scope.row.id])">删除</el-button>
      </template>
    </custom-table>

    <el-dialog
        v-model="dialogFormVisible"
        :close-on-click-modal="false"
        :title="dialogTitleMap[dialogStatus]"
        destroy-on-close
        style="width: 650px"
    >
      <el-form ref="dataForm" :model="temp" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" placeholder="请填写名称"/>
        </el-form-item>
        <el-form-item label="标识" prop="roleNo">
          <el-input v-model="temp.roleNo" placeholder="请填写标识"/>
        </el-form-item>
        <el-form-item label="排序" prop="orderNo">
          <el-input v-model="temp.orderNo" placeholder="请填写排序"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
              v-model="temp.remark"
              :rows="2"
              placeholder="请填写备注"
              type="textarea"
          />
        </el-form-item>
        <el-form-item label="功能权限" prop="menuIdList">
          <role-tree v-model:value="temp.menuIdList" :data="menuList"/>
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
  name: 'role'
}
</script>
<script setup>
import {reactive, ref, toRefs} from "vue";
import RoleService from "../../../api/role";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import MenuService from "../../../api/menu";
import {deepTree} from "../../../core/utils/array";

const dataForm = ref(null)
const dialogTitleMap = {
  update: '编辑',
  create: '新增'
}
const columns = [
  {
    prop: 'name',
    label: '名称',
  },
  {
    prop: 'roleNo',
    label: '标识',
  },
  {
    prop: 'orderNo',
    label: '排序',
  },
]
const list = ref([])
const menuList = ref([])
const state = reactive({
  dialogFormVisible: false,
  dialogStatus: '',
  searchKey: '',
  temp: {
    id: undefined,
    name: "",
    roleNo: "",
    orderNo: 0,
    remark: '',
    menuIdList: [],
  },
  rules: {
    name: [{required: true, message: "名称必须", trigger: "blur"}],
    roleNo: [{required: true, message: "标识必须", trigger: "blur"}],
  },
})


// 查询角色列表
const queryRoleList = async () => {
  let payload = {
    name: state.searchKey
  };
  const result = await RoleService.getRoleList(payload)
  if (result.code === 200) {
    list.value = result.data;
  }
}


const queryMenuList = async () => {
  const result = await MenuService.getMenuList();
  if (result.code === 200) {
    menuList.value = deepTree(result.data);
  }
};

const handleDelete = (row) => {
  ElMessageBox.confirm(`是否删除此项数据？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    ElMessage.success('删除成功!')
  }).catch(() => {
    console.log('已取消删除');
  })
}

const resetTemp = () => {
  state.temp = {
    id: undefined,
    name: "",
    roleNo: "",
    orderNo: 0,
    remark: '',
    menuIdList: [],
  }
}

const handleCreate = () => {
  resetTemp()
  state.dialogStatus = 'create';
  state.dialogFormVisible = true;
}

const handleEdit = async (row) => {
  resetTemp()
  const roleInfo = await RoleService.getRoleInfo(row.id)
  let menuIdList = []
  if (roleInfo.data.roleMenuIds) {
    menuIdList = roleInfo.data.roleMenuIds.split(',').map(Number)
  }

  state.temp = {
    id: row.id,
    name: row.name,
    roleNo: row.roleNo,
    orderNo: row.orderNo,
    remark: row.remark,
    menuIdList: menuIdList,
  }
  state.dialogStatus = "update";
  state.dialogFormVisible = true;
}

const createData = () => {
  dataForm.value.validate(async (valid) => {
    if (valid) {
      state.dialogFormVisible = false;
      ElNotification({
        title: "角色",
        message: "创建成功",
        type: "success",
        duration: 2000,
      });
    }
  });
}

const updateData = () => {
  dataForm.value.validate(async (valid) => {
    if (valid) {
      state.dialogFormVisible = false;
      ElNotification({
        title: "角色",
        message: "更新完成",
        type: "success",
        duration: 2000,
      });
    }
  });
}

queryRoleList()
queryMenuList()
const {temp, rules, searchKey, dialogFormVisible, dialogStatus} = toRefs(state)
</script>

<style lang="scss" scoped></style>