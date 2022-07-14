<template>
  <el-card>
    <template #header>
      <el-row justify="space-between">
        <el-row>
          <el-form inline class="card-header">
            <el-form-item>
              <el-input v-model="searchKey" clearable placeholder="请输入名称"/>
            </el-form-item>
          </el-form>
          <div>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </div>
        </el-row>
        <el-button type="primary" @click="handleCreate">新增</el-button>
      </el-row>
    </template>

    <custom-table :data="list" :columns="columns"
                  v-model:pagination="pagination"
                  showPagination showSelection action
                  @load="queryUserList">
      <template #handler="scope">
        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete([scope.row.id])">删除</el-button>
      </template>
    </custom-table>

    <custom-dialog v-model="dialogFormVisible" @confirm="dialogStatus === 'create' ? createData() : updateData()">
      <el-form ref="dataForm" :model="temp" :rules="rules" label-width="150px">
        <el-form-item label="用户名" prop="nickname">
          <el-input v-model="temp.nickname" placeholder="请填写用户名"/>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="temp.phone" placeholder="请填写手机号码"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email" placeholder="请填写邮箱"/>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="temp.roleIds" clearable filterable multiple placeholder="请选择" style="width: 100%"
                     effect="dark">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
    </custom-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'user'
}
</script>
<script setup>
import {reactive, ref, toRefs} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import RoleService from "../../../api/role";
import UserService from "../../../api/user";

const dataForm = ref(null);

const columns = [
  {
    prop: 'nickname',
    label: '用户名',
  },
  {
    prop: 'phone',
    label: '手机号',
  }, {
    prop: 'email',
    label: '邮箱',
  },
]

let pagination = reactive({
  total: 100,
  current: 1,
  size: 10
})
const list = ref([])
const rules ={
  nickname: [{required: true, message: "用户名必须", trigger: "blur"}],
  phone: [{required: true, message: "手机号必须", trigger: "blur"}],
  email: [{required: true, message: "邮箱必须", trigger: "blur"}],
}
const state = reactive({
  searchKey: '',
  dialogStatus: "",
  dialogFormVisible: false,
  temp: {
    id: undefined,
    phone: '',
    email: '',
    nickname: '',
    roleIds: [],
  },
  roleList: [],
})

// 查询用户
const queryUserList = async () => {
  let payload = {
    userName: state.searchKey,
    current: pagination.current,
    size: pagination.size,
  };
  const result = await UserService.getUserList(payload)
  if (result.code === 200) {
    pagination.total = result.data.total
    pagination.current = result.data.current
    list.value = result.data.records;
  }
}

const queryRoleList = async () => {
  const result = await RoleService.getRoleList({name: null})
  if (result.code === 200) {
    state.roleList = result.data;
  }
}

const resetTemp = () => {
  state.temp = {
    id: undefined,
    phone: '',
    email: '',
    region: '',
    nickname: '',
  }
}

const handleCreate = () => {
  resetTemp()
  state.dialogStatus = 'create';
  state.dialogFormVisible = true;
}

const handleEdit = async (row) => {
  state.temp = {
    ...row,
    roleIds: row.roleIds.split(',').map(Number),
    password: ''
  }
  state.dialogStatus = "update";
  state.dialogFormVisible = true;
};

const createData = () => {
  dataForm.value.validate(async (valid) => {
    if (valid) {
      state.dialogFormVisible = false;
      ElNotification({
        title: "用户",
        message: "创建成功",
        type: "success",
        duration: 2000,
      })
    }
  });
}

const updateData = () => {
  dataForm.value.validate(async (valid) => {
    if (valid) {
      state.dialogFormVisible = false;
      ElNotification({
        title: "用户",
        message: "更新完成",
        type: "success",
        duration: 2000,
      })
    }
  });
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`是否删除用户？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    ElMessage.success('删除成功!')
  }).catch(() => {
    console.log('已取消删除');
  })
}


queryUserList()
queryRoleList()

const {
  temp,
  searchKey,
  dialogStatus,
  dialogFormVisible,
  roleList,
} = toRefs(state)

</script>

<style lang="scss" scoped>
</style>