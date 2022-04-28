<!--<template>-->
<!--  <div class="app-container">-->
<!--    <div class="app-body">-->
<!--      <div class="custom-table-header">-->
<!--        <div class="custom-table-header-action">-->
<!--          <el-button size="small" type="primary" @click="handleCreate">新增</el-button>-->
<!--        </div>-->
<!--        <div class="table-search-box">-->
<!--          <el-input-->
<!--              v-model="searchKey"-->
<!--              class="table-search-key"-->
<!--              placeholder="请输入用户名"-->
<!--          />-->
<!--          <el-button size="small" type="primary" @click="handleSearch">搜索</el-button>-->
<!--          <el-button size="small" type="primary" @click="handleImport">导入</el-button>-->
<!--          <el-button size="small" type="primary" @click="handleExport">导出</el-button>-->
<!--        </div>-->
<!--      </div>-->
<!--      <el-table-->
<!--          :data="list"-->
<!--          border-->
<!--          current-row-key="id"-->
<!--          fit-->
<!--          height="600"-->
<!--          size="mini"-->
<!--          style="width: 100%"-->
<!--          @selection-change="handleSelectionChange"-->
<!--      >-->
<!--        <el-table-column type="selection" width="55"/>-->
<!--        <el-table-column align="center" label="头像" props="headImgUrl" width="150">-->
<!--          <template #default="scope">-->
<!--            <el-avatar :src="scope.row.headImgUrl" shape="square"></el-avatar>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column align="center" label="用户名" prop="userName" width="180"/>-->
<!--        <el-table-column align="center" label="真实姓名" prop="realName" width="150"/>-->
<!--        <el-table-column align="center" label="状态" prop="status" width="150">-->
<!--          <template #default="scope">-->
<!--            <el-tag-->
<!--                v-if="scope.row.status === 1"-->
<!--                effect="dark"-->
<!--                style="margin: 2px"-->
<!--            >{{ statusOptions[scope.row.status] }}-->
<!--            </el-tag>-->
<!--            <el-tag v-if="scope.row.status === 0" effect="dark" type="danger">{{-->
<!--                statusOptions[scope.row.status]-->
<!--              }}-->
<!--            </el-tag>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column align="center" label="手机号" prop="phone" width="180"/>-->
<!--        <el-table-column align="center" label="Email" prop="email" width="250"/>-->
<!--        <el-table-column align="center" label="备注" prop="memo" width="250"/>-->
<!--        <el-table-column align="center" fixed="right" label="操作" width="230">-->
<!--          <template #default="scope">-->
<!--            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>-->
<!--            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--      <div class="custom-table-pagination">-->
<!--        <el-pagination-->
<!--            :current-page="pagination.current"-->
<!--            :page-size="pagination.size"-->
<!--            :page-sizes="[10, 15, 20, 40,100]"-->
<!--            :total="pagination.total"-->
<!--            layout="total, sizes, prev, pager, next, jumper"-->
<!--            next-text="下一页"-->
<!--            prev-text="上一页"-->
<!--            @size-change="handleSizeChange"-->
<!--            @current-change="handleCurrentChange"-->
<!--        >-->
<!--        </el-pagination>-->
<!--      </div>-->
<!--    </div>-->

<!--    <el-dialog-->
<!--        v-model="dialogFormVisible"-->
<!--        :close-on-click-modal="false"-->
<!--        :title="dialogTitleMap[dialogStatus]"-->
<!--        style="width: 650px"-->
<!--    >-->
<!--      <el-form ref="dataForm" :model="temp" :rules="rules" label-width="100px">-->
<!--        <el-form-item label="头像" prop="headImgUrl">-->
<!--          <avatar-upload v-model="temp.headImgUrl"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="用户名" prop="userName">-->
<!--          <el-input v-model="temp.userName" placeholder="请填写用户名"/>-->
<!--        </el-form-item>-->
<!--        <el-row :gutter="10">-->
<!--          <el-col :md="12">-->
<!--            <el-form-item label="真实姓名" prop="realName">-->
<!--              <el-input v-model="temp.realName" placeholder="请填写真实姓名"/>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :md="12">-->
<!--            <el-form-item label="密码" prop="password">-->
<!--              <el-input v-model="temp.password" placeholder="请填写密码" show-password/>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row :gutter="10">-->
<!--          <el-col :md="12">-->
<!--            <el-form-item label="手机号码" prop="phone">-->
<!--              <el-input v-model="temp.phone" placeholder="请填写手机号码"/>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :md="12">-->
<!--            <el-form-item label="邮箱" prop="email">-->
<!--              <el-input v-model="temp.email" placeholder="请填写邮箱"/>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-form-item label="角色" prop="roleIds">-->
<!--          <el-select-->
<!--              v-model="temp.roleIds"-->
<!--              multiple-->
<!--              placeholder="请选择"-->
<!--              style="width: 100%"-->
<!--          >-->
<!--            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"/>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="备注" prop="memo">-->
<!--          <el-input v-model="temp.memo" :rows="2" placeholder="请填写备注" type="textarea"/>-->
<!--        </el-form-item>-->
<!--        <el-row>-->
<!--          <el-col :md="8">-->
<!--            <el-form-item label="默认初审人" prop="checkUserId">-->
<!--              <el-select-->
<!--                  v-model="temp.checkUserId"-->
<!--                  placeholder="请选择"-->
<!--                  style="width: 100%"-->
<!--                  filterable-->
<!--              >-->
<!--                <el-option v-for="item in allUsers" :key="item.userId" :label="item.realName" :value="item.userId"/>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :md="8">-->
<!--            <el-form-item label="默认复审人" prop="recheckUserId">-->
<!--              <el-select-->
<!--                  v-model="temp.recheckUserId"-->
<!--                  placeholder="请选择"-->
<!--                  style="width: 100%"-->
<!--                  filterable-->
<!--              >-->
<!--                <el-option v-for="item in allUsers" :key="item.userId" :label="item.realName" :value="item.userId"/>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :md="8">-->
<!--            <el-form-item label="发票顶额" prop="invoiceMaxAmount">-->
<!--              <el-select-->
<!--                  v-model="temp.invoiceMaxAmount"-->
<!--                  placeholder="请选择"-->
<!--                  style="width: 100%"-->
<!--              >-->
<!--                <el-option-->
<!--                    v-for="item in invoice"-->
<!--                    :key="item.value"-->
<!--                    :label="item.label"-->
<!--                    :value="item.value"-->
<!--                ></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-form-item label="性别" prop="sex">-->
<!--          <el-radio-group v-model="temp.sex">-->
<!--            <el-radio :label="1">男</el-radio>-->
<!--            <el-radio :label="2">女</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="状态" prop="status">-->
<!--          <el-radio v-model="temp.status" :label="1">开启</el-radio>-->
<!--          <el-radio v-model="temp.status" :label="0">禁用</el-radio>-->
<!--        </el-form-item>-->
<!--        <el-form-item v-if="dialogStatus === 'create'" label="">-->
<!--          <i class="el-icon-warning"></i>-->
<!--          <span style="margin-left: 6px">新增用户默认密码为：123456</span>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <template #footer>-->
<!--        <el-button @click="dialogFormVisible = false"> 取消</el-button>-->
<!--        <el-button-->
<!--            type="success"-->
<!--            @click="dialogStatus === 'create' ? createData() : updateData()"-->
<!--        >-->
<!--          确定-->
<!--        </el-button>-->
<!--      </template>-->
<!--    </el-dialog>-->

<!--    <excel-export v-model="showExport" name="用户导出" :url="exportUserUrl" :data="checkIdList" method="post" width="400px"/>-->
<!--    <upload-file v-model="showImport" name="multipartFile" accept=".xlsx" action="/excel/importUser" title="用户导入" :onSuccess="onSuccess" width="500px"/>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {reactive, ref, toRefs} from "vue";-->
<!--import {deleteUser, getAllUser, getRoleByUserId, getUserList, saveUser} from '@/api/user';-->
<!--import {getRoleList} from '@/api/role'-->
<!--import useTable from "@/hooks/useTable";-->
<!--import {ElMessage, ElMessageBox, ElNotification} from "element-plus";-->
<!--import useFile from "../../../../hooks/useFile";-->
<!--import {exportUserUrl} from "../../../../api/user";-->
<!--import AvatarUpload from "../../../../components/avatar-upload";-->

<!--export default {-->
<!--  name: 'systemUser',-->
<!--  components: {AvatarUpload},-->
<!--  setup() {-->
<!--    const dataForm = ref(null);-->
<!--    const state = reactive({-->
<!--      exportUserUrl,-->
<!--      list: [],-->
<!--      searchKey: '',-->
<!--      dialogTitleMap: {-->
<!--        update: "Edit",-->
<!--        create: "Create",-->
<!--      },-->
<!--      dialogStatus: "",-->
<!--      dialogFormVisible: false,-->
<!--      statusOptions: {-->
<!--        0: "禁用",-->
<!--        1: "启用",-->
<!--      },-->
<!--      invoice: [-->
<!--        {-->
<!--          value: 1,-->
<!--          label: 100000,-->
<!--        },-->
<!--        {-->
<!--          value: 2,-->
<!--          label: 1000000,-->
<!--        },-->
<!--      ],-->
<!--      temp: {-->
<!--        id: undefined,-->
<!--        realName: "",-->
<!--        userName: "",-->
<!--        status: 1,-->
<!--        headImgUrl: '',-->
<!--        password: '123456',-->
<!--        sex: 1,-->
<!--        email: "",-->
<!--        memo: "",-->
<!--        phone: "",-->
<!--        roleIds: [],-->
<!--        invoiceMaxAmount: null,-->
<!--        checkUserId: null,-->
<!--        recheckUserId: null,-->
<!--      },-->
<!--      rules: {-->
<!--        userName: [{required: true, message: "用户名必须", trigger: "blur"}],-->
<!--        realName: [{required: true, message: "真实姓名必须", trigger: "blur"}],-->
<!--        email: [{required: true, message: "邮箱必须", trigger: "blur"}],-->
<!--        phone: [{required: true, message: "手机号必须", trigger: "blur"}],-->
<!--      },-->
<!--      roleList: [],-->
<!--      allUsers: [],-->
<!--    })-->

<!--    // 查询全部用户-->
<!--    const queryAllUser = async () => {-->
<!--      const result = await getAllUser()-->
<!--      if (result.code === 10000) {-->
<!--        state.allUsers = result.data-->
<!--      }-->
<!--    }-->

<!--    // 查询用户-->
<!--    const queryUserList = async () => {-->
<!--      let payload = {-->
<!--        userName: state.searchKey,-->
<!--        current: pagination.value.current,-->
<!--        size: pagination.value.size,-->
<!--      };-->
<!--      const result = await getUserList(payload)-->
<!--      if (result.code === 10000) {-->
<!--        const {records, ...paging} = result.data;-->
<!--        pagination.value = {...paging}-->
<!--        state.list = records.map((e) => {-->
<!--          return {-->
<!--            ...e,-->
<!--            headImgUrl: `${process.env.VUE_APP_BASE_API}/${e.headImgUrl}`-->
<!--          }-->
<!--        });-->
<!--      }-->
<!--    }-->

<!--    const queryRoleList = async () => {-->
<!--      const result = await getRoleList({name: null})-->
<!--      if (result.code === 10000) {-->
<!--        state.roleList = result.data;-->
<!--      }-->
<!--    }-->

<!--    const resetTemp = () => {-->
<!--      state.temp = {-->
<!--        id: undefined,-->
<!--        realName: "",-->
<!--        userName: "",-->
<!--        status: 1,-->
<!--        headImgUrl: '',-->
<!--        password: '123456',-->
<!--        sex: 1,-->
<!--        email: "",-->
<!--        memo: "",-->
<!--        phone: "",-->
<!--        roleIds: [],-->
<!--        invoiceMaxAmount: null,-->
<!--        checkUserId: null,-->
<!--        recheckUserId: null,-->
<!--      }-->
<!--    }-->

<!--    const handleCreate = () => {-->
<!--      resetTemp()-->
<!--      state.dialogStatus = 'create';-->
<!--      state.dialogFormVisible = true;-->
<!--    }-->

<!--    const handleEdit = async (row) => {-->
<!--      const result = await getRoleByUserId(row.id)-->
<!--      if (result.code === 10000) {-->
<!--        let {roleIds} = result.data;-->
<!--        if (roleIds) {-->
<!--          roleIds = roleIds.split(',').map(Number)-->
<!--        }-->
<!--        state.temp = Object.assign({}, {-->
<!--          ...row,-->
<!--          roleIds,-->
<!--          password: ''-->
<!--        });-->
<!--        state.dialogStatus = "update";-->
<!--        state.dialogFormVisible = true;-->
<!--      }-->
<!--    };-->

<!--    const createData = () => {-->
<!--      dataForm.value.validate(async (valid) => {-->
<!--        if (valid) {-->
<!--          const {-->
<!--            userName,-->
<!--            realName,-->
<!--            status,-->
<!--            headImgUrl,-->
<!--            sex,-->
<!--            email,-->
<!--            memo,-->
<!--            phone,-->
<!--            roleIds,-->
<!--            password,-->
<!--            invoiceMaxAmount,-->
<!--            checkUserId,-->
<!--            recheckUserId-->
<!--          } = state.temp-->
<!--          let url = headImgUrl.substr(process.env.VUE_APP_BASE_API.length + 1, headImgUrl.length)-->
<!--          let payload = {-->
<!--            userName,-->
<!--            realName,-->
<!--            status,-->
<!--            headImgUrl: url,-->
<!--            password,-->
<!--            sex,-->
<!--            email,-->
<!--            memo,-->
<!--            phone,-->
<!--            roleIds: roleIds.toString(),-->
<!--            invoiceMaxAmount, checkUserId, recheckUserId,-->
<!--          }-->
<!--          await saveUser(payload)-->
<!--          await queryUserList();-->
<!--          state.dialogFormVisible = false;-->
<!--          ElNotification({-->
<!--            title: "Success",-->
<!--            message: "创建成功",-->
<!--            type: "success",-->
<!--            duration: 2000,-->
<!--          });-->
<!--        }-->
<!--      });-->
<!--    }-->

<!--    const updateData = () => {-->
<!--      dataForm.value.validate(async (valid) => {-->
<!--        if (valid) {-->
<!--          const {-->
<!--            id,-->
<!--            userName,-->
<!--            realName,-->
<!--            status,-->
<!--            headImgUrl,-->
<!--            sex,-->
<!--            email,-->
<!--            memo,-->
<!--            phone,-->
<!--            roleIds,-->
<!--            password,-->
<!--            invoiceMaxAmount,-->
<!--            checkUserId,-->
<!--            recheckUserId,-->
<!--          } = state.temp-->
<!--          let url = headImgUrl.substr(process.env.VUE_APP_BASE_API.length + 1, headImgUrl.length)-->
<!--          let payload = {-->
<!--            id,-->
<!--            userName,-->
<!--            realName,-->
<!--            status,-->
<!--            headImgUrl: url,-->
<!--            password,-->
<!--            sex,-->
<!--            email,-->
<!--            memo,-->
<!--            phone,-->
<!--            roleIds: roleIds.toString(),-->
<!--            invoiceMaxAmount, checkUserId, recheckUserId,-->
<!--          }-->
<!--          await saveUser(payload)-->
<!--          await queryUserList();-->
<!--          state.dialogFormVisible = false;-->
<!--          ElNotification({-->
<!--            title: "成功",-->
<!--            message: "更新完成",-->
<!--            type: "success",-->
<!--            duration: 2000,-->
<!--          });-->
<!--        }-->
<!--      });-->
<!--    }-->

<!--    const handleDelete = (row) => {-->
<!--      ElMessageBox.confirm(`是否删除用户 ${row.userName}？`, '提示', {-->
<!--        confirmButtonText: '确定',-->
<!--        cancelButtonText: '取消',-->
<!--        type: 'warning'-->
<!--      }).then(async () => {-->
<!--        await deleteUser(row.id)-->
<!--        await queryUserList();-->
<!--        ElMessage.success('删除成功!')-->
<!--      }).catch(() => {-->
<!--        console.log('已取消删除');-->
<!--      })-->
<!--    }-->

<!--    let {pagination, checkIdList,handleSelectionChange,handleCurrentChange, handleSizeChange, refresh, handleSearch} = useTable({queryFn: queryUserList})-->

<!--    let {showExport, showImport} = useFile();-->

<!--    const handleExport = () => {-->
<!--      if (checkIdList.value.length === 0) {-->
<!--        ElMessage.warning('请选择导出的用户')-->
<!--        return-->
<!--      }-->
<!--      showExport.value = true-->
<!--    }-->

<!--    const handleImport = () => {-->
<!--      showImport.value = true-->
<!--    }-->

<!--    const onSuccess = () => {-->
<!--      queryUserList()-->
<!--      queryAllUser()-->
<!--    }-->

<!--    queryUserList()-->
<!--    queryRoleList()-->
<!--    queryAllUser()-->

<!--    return {-->
<!--      dataForm,-->
<!--      ...toRefs(state),-->
<!--      pagination,-->
<!--      checkIdList,-->
<!--      handleCreate,-->
<!--      handleEdit,-->
<!--      createData,-->
<!--      updateData,-->
<!--      handleDelete,-->
<!--      refresh,-->
<!--      handleSearch,-->
<!--      handleCurrentChange,-->
<!--      handleSizeChange,-->
<!--      handleSelectionChange,-->
<!--      showExport,-->
<!--      showImport,-->
<!--      handleExport,-->
<!--      handleImport,-->
<!--      onSuccess-->
<!--    };-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.app-body {-->
<!--  :deep .el-tag + .el-tag {-->
<!--    margin-left: 10px;-->
<!--    margin-bottom: 10px;-->
<!--  }-->
<!--}-->
<!--</style>-->