<template>
  <el-card>
    <template #header>
      <el-button type="primary" @click="handleCreate">新增</el-button>
      <el-input v-model="searchKey" clearable placeholder="请输入名称"/>
      <el-button size="small" type="primary" @click="handleSearch">搜索</el-button>
    </template>
    <el-table
        :data="list"
        border
        current-row-key="id"
        fit
        height="600"
        size="mini"
        style="width: 100%"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column align="center" label="头像" props="headImgUrl" width="150">
        <template #default="scope">
          <el-avatar :src="scope.row.headImgUrl" shape="square"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" prop="userName" width="180"/>
      <el-table-column align="center" label="真实姓名" prop="realName" width="150"/>
      <el-table-column align="center" label="状态" prop="status" width="150">
        <template #default="scope">
          <el-tag
              v-if="scope.row.status === 1"
              effect="dark"
              style="margin: 2px"
          >{{ statusOptions[scope.row.status] }}
          </el-tag>
          <el-tag v-if="scope.row.status === 0" effect="dark" type="danger">{{
              statusOptions[scope.row.status]
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" prop="phone" width="180"/>
      <el-table-column align="center" label="Email" prop="email" width="250"/>
      <el-table-column align="center" label="备注" prop="memo" width="250"/>
      <el-table-column align="center" fixed="right" label="操作" width="230">
        <template #default="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-pagination
          :current-page="pagination.current"
          :page-size="pagination.size"
          :page-sizes="[10, 15, 20, 40,100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          next-text="下一页"
          prev-text="上一页"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-row>
    <el-dialog
        v-model="dialogFormVisible"
        :close-on-click-modal="false"
        :title="dialogTitleMap[dialogStatus]"
        style="width: 650px"
    >
      <el-form ref="dataForm" :model="temp" :rules="rules" label-width="100px">
        <el-row :gutter="10">
          <el-col :md="12">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="temp.userName" placeholder="请填写用户名"/>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="temp.phone" placeholder="请填写手机号码"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :md="12">
            <el-form-item label="姓名" prop="realName">
              <el-input v-model="temp.realName" placeholder="请填写真实姓名"/>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="temp.password" placeholder="请填写密码" show-password/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="角色" prop="roleIds">
          <el-select
              v-model="temp.roleIds"
              multiple
              placeholder="请选择"
              style="width: 100%"
          >
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="temp.memo" :rows="2" placeholder="请填写备注" type="textarea"/>
        </el-form-item>
        <el-row>
          <el-col :md="8">
            <el-form-item label="默认初审人" prop="checkUserId">
              <el-select
                  v-model="temp.checkUserId"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
              >
                <el-option v-for="item in allUsers" :key="item.userId" :label="item.realName" :value="item.userId"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="默认复审人" prop="recheckUserId">
              <el-select
                  v-model="temp.recheckUserId"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
              >
                <el-option v-for="item in allUsers" :key="item.userId" :label="item.realName" :value="item.userId"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="发票顶额" prop="invoiceMaxAmount">
              <el-select
                  v-model="temp.invoiceMaxAmount"
                  placeholder="请选择"
                  style="width: 100%"
              >
                <el-option
                    v-for="item in invoice"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
  name:'user'
}
</script>
<script setup>
import {reactive, ref, toRefs} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import useTable from "../../../core/hook/useTable";
import MemberService from "../../../api/member";
import RoleService from "../../../api/role";

const dataForm = ref(null);
const state = reactive({
  list: [],
  searchKey: '',
  dialogTitleMap: {
    update: "Edit",
    create: "Create",
  },
  dialogStatus: "",
  dialogFormVisible: false,
  temp: {
    id: undefined,
    realName: "",
    userName: "",
    password: '',
    memo: "",
    phone: "",
    roleIds: [],
  },
  rules: {
    userName: [{required: true, message: "用户名必须", trigger: "blur"}],
    realName: [{required: true, message: "姓名必须", trigger: "blur"}],
    roleIds: [{required: true, message: "角色必须", trigger: "blur"}],
    phone: [{required: true, message: "手机号必须", trigger: "blur"}],
  },
  roleList: [],
})

// 查询用户
const queryUserList = async () => {
  let payload = {
    userName: state.searchKey,
    current: pagination.value.current,
    size: pagination.value.size,
  };
  const result = await RoleService.getUserList(payload)
  if (result.code === 10000) {
    const {records, ...paging} = result.data;
    pagination.value = {...paging}
    state.list = records.map((e) => {
      return {
        ...e,
        headImgUrl: `${process.env.VUE_APP_BASE_API}/${e.headImgUrl}`
      }
    });
  }
}

const queryRoleList = async () => {
  const result = await RoleService.getRoleList({name: null})
  if (result.code === 10000) {
    state.roleList = result.data;
  }
}

const resetTemp = () => {
  state.temp = {
    id: undefined,
    realName: "",
    userName: "",
    password: '',
    memo: "",
    phone: "",
    roleIds: [],
  }
}

const handleCreate = () => {
  resetTemp()
  state.dialogStatus = 'create';
  state.dialogFormVisible = true;
}

const handleEdit = async (row) => {
  const result = await MemberService.getRoleByUserId(row.id)
  if (result.code === 10000) {
    let {roleIds} = result.data;
    if (roleIds) {
      roleIds = roleIds.split(',').map(Number)
    }
    state.temp = Object.assign({}, {
      ...row,
      roleIds,
      password: ''
    });
    state.dialogStatus = "update";
    state.dialogFormVisible = true;
  }
};

const createData = () => {
  dataForm.value.validate(async (valid) => {
    if (valid) {
      await MemberService.saveUser(state.temp)
      await queryUserList();
      state.dialogFormVisible = false;
      ElNotification({
        title: "用户",
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
      await MemberService.saveUser(state.temp)
      await queryUserList();
      state.dialogFormVisible = false;
      ElNotification({
        title: "用户",
        message: "更新完成",
        type: "success",
        duration: 2000,
      });
    }
  });
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`是否删除用户 ${row.userName}？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await MemberService.deleteUser(row.id)
    await queryUserList();
    ElMessage.success('删除成功!')
  }).catch(() => {
    console.log('已取消删除');
  })
}

let {
  pagination,
  handleSelectionChange,
  handleCurrentChange,
  handleSizeChange,
  refresh,
  handleSearch
} = useTable({queryFn: queryUserList})


queryUserList()
queryRoleList()

const {list, searchKey, dialogTitleMap, dialogStatus, dialogFormVisible, temp, rules, roleList} = toRefs(state)

</script>

<style lang="scss" scoped>
</style>