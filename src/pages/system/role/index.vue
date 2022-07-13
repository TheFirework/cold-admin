<!--<template>-->
<!--  <div class="app-container">-->
<!--    <div class="app-body">-->
<!--      <div class="custom-table-header">-->
<!--        <div class="custom-table-header-action">-->
<!--          <div class="refresh-button" @click="refresh">-->
<!--            <i class="el-icon-refresh"></i>-->
<!--          </div>-->
<!--          <el-button size="small" type="primary" @click="handleCreate"-->
<!--          >新增-->
<!--          </el-button>-->
<!--        </div>-->
<!--        <div class="table-search-box">-->
<!--          <el-input-->
<!--              v-model="searchKey"-->
<!--              class="table-search-key"-->
<!--              placeholder="请输入名称"-->
<!--          />-->
<!--          <el-button size="small" type="primary" @click="handleSearch"-->
<!--          >搜索-->
<!--          </el-button>-->
<!--        </div>-->
<!--      </div>-->
<!--      <el-table-->
<!--          :data="list"-->
<!--          border-->
<!--          current-row-key="id"-->
<!--          fit-->
<!--          max-height="700"-->
<!--          size="small"-->
<!--          style="width: 100%"-->
<!--      >-->
<!--        <el-table-column align="center" label="序号" prop="id"/>-->
<!--        <el-table-column align="center" label="名称" prop="name" width="150"/>-->
<!--        <el-table-column align="center" label="标识" prop="roleNo"/>-->
<!--        <el-table-column align="center" label="排序" prop="orderNo" width="150"/>-->
<!--        <el-table-column :formatter="(row)=>formatter(row,'createDate')" align="center" label="时间" prop="createDate"/>-->
<!--        <el-table-column align="center" fixed="right" label="操作" width="150">-->
<!--          <template #default="scope">-->
<!--            <el-button size="small" type="primary" @click="handleEdit(scope.row)"-->
<!--            >编辑-->
<!--            </el-button>-->
<!--            <el-button-->
<!--                size="small"-->
<!--                type="danger"-->
<!--                @click="handleDelete(scope.row)"-->
<!--            >删除-->
<!--            </el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </div>-->

<!--    <el-dialog-->
<!--        v-model="dialogFormVisible"-->
<!--        :close-on-click-modal="false"-->
<!--        :title="dialogTitleMap[dialogStatus]"-->
<!--        style="width: 650px"-->
<!--    >-->
<!--      <el-form ref="dataForm" :model="temp" :rules="rules" label-width="100px">-->
<!--        <el-form-item label="名称" prop="name">-->
<!--          <el-input v-model="temp.name" placeholder="请填写名称"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="标识" prop="roleNo">-->
<!--          <el-input v-model="temp.roleNo" placeholder="请填写标识"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="排序" prop="orderNo">-->
<!--          <el-input v-model="temp.orderNo" placeholder="请填写排序"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="备注" prop="memo">-->
<!--          <el-input-->
<!--              v-model="temp.memo"-->
<!--              :rows="2"-->
<!--              placeholder="请填写备注"-->
<!--              type="textarea"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="功能权限" prop="menuIdList">-->
<!--          <role-tree v-model:value="temp.menuIdList" :data="menuList"/>-->
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
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {reactive, ref, toRefs} from "vue";-->
<!--import useTable from "@/hooks/useTable";-->
<!--import {ElMessage, ElMessageBox, ElNotification} from "element-plus";-->
<!--import {deleteRole, getRoleList, saveRole, getMenus} from "@/api/role";-->
<!--import {getMenuList} from "@/api/menu";-->
<!--import {deepTree} from "@/utils";-->

<!--export default {-->
<!--  name: 'Role',-->
<!--  setup() {-->
<!--    const dataForm = ref(null);-->
<!--    const state = reactive({-->
<!--      list: [],-->
<!--      searchKey: null,-->
<!--      dialogTitleMap: {-->
<!--        update: "Edit",-->
<!--        create: "Create",-->
<!--      },-->
<!--      dialogStatus: "",-->
<!--      dialogFormVisible: false,-->

<!--      menuList: [],-->
<!--      temp: {-->
<!--        id: undefined,-->
<!--        name: "",-->
<!--        roleNo: "",-->
<!--        orderNo: 0,-->
<!--        memo: '',-->
<!--        menuIdList: []-->
<!--      },-->
<!--      rules: {-->
<!--        name: [{required: true, message: "名称必须", trigger: "blur"}],-->
<!--        roleNo: [{required: true, message: "标识必须", trigger: "blur"}],-->
<!--      },-->
<!--    })-->

<!--    // 查询角色列表-->
<!--    const queryRoleList = async () => {-->
<!--      let payload = {-->
<!--        name: state.searchKey-->
<!--      };-->
<!--      const result = await getRoleList(payload)-->
<!--      if (result.code === 10000) {-->
<!--        state.list = result.data;-->
<!--      }-->
<!--    }-->

<!--    const queryMenuList = async () => {-->
<!--      const result = await getMenuList();-->
<!--      if (result.code === 10000) {-->
<!--        state.menuList = deepTree(result.data);-->
<!--      }-->
<!--    };-->

<!--    const handleDelete = (row) => {-->
<!--      ElMessageBox.confirm(`是否删除角色 ${row.name}？`, '提示', {-->
<!--        confirmButtonText: '确定',-->
<!--        cancelButtonText: '取消',-->
<!--        type: 'warning'-->
<!--      }).then(async () => {-->
<!--        await deleteRole(row.id)-->
<!--        await queryRoleList();-->
<!--        ElMessage.success('删除成功!')-->
<!--      }).catch(() => {-->
<!--        console.log('已取消删除');-->
<!--      })-->
<!--    }-->

<!--    const resetTemp = () => {-->
<!--      state.temp = {-->
<!--        id: undefined,-->
<!--        name: "",-->
<!--        roleNo: "",-->
<!--        orderNo: 0,-->
<!--        memo: '',-->
<!--        menuIdList: []-->
<!--      }-->
<!--    }-->

<!--    const handleCreate = () => {-->
<!--      resetTemp()-->
<!--      state.dialogStatus = 'create';-->
<!--      state.dialogFormVisible = true;-->
<!--    }-->

<!--    const handleEdit = async (row) => {-->
<!--      state.temp = Object.assign({}, {-->
<!--        id: row.id,-->
<!--        name: row.name,-->
<!--        roleNo: row.roleNo,-->
<!--        orderNo: row.orderNo,-->
<!--        memo: row.memo,-->
<!--        menuIdList: []-->
<!--      });-->
<!--      const result = await getMenus(row.id)-->
<!--      state.temp.menuIdList = result.data-->
<!--      state.dialogStatus = "update";-->
<!--      state.dialogFormVisible = true;-->
<!--    };-->

<!--    const createData = () => {-->
<!--      dataForm.value.validate(async (valid) => {-->
<!--        if (valid) {-->
<!--          let role = {-->
<!--            name: state.temp.name,-->
<!--            roleNo: state.temp.roleNo,-->
<!--            orderNo: state.temp.orderNo,-->
<!--            memo: state.temp.memo,-->
<!--            roleMenuIds: state.temp.menuIdList.toString()-->
<!--          }-->
<!--          await saveRole(role)-->
<!--          await queryRoleList()-->
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
<!--          let role = {-->
<!--            id: state.temp.id,-->
<!--            name: state.temp.name,-->
<!--            roleNo: state.temp.roleNo,-->
<!--            orderNo: state.temp.orderNo,-->
<!--            // parentId: state.temp.parentId,-->
<!--            memo: state.temp.memo,-->
<!--            roleMenuIds: state.temp.menuIdList.toString()-->
<!--          }-->
<!--          await saveRole(role)-->
<!--          await queryRoleList()-->
<!--          state.dialogFormVisible = false;-->
<!--          ElNotification({-->
<!--            title: "Success",-->
<!--            message: "更新完成",-->
<!--            type: "success",-->
<!--            duration: 2000,-->
<!--          });-->
<!--        }-->
<!--      });-->
<!--    }-->

<!--    let {refresh, handleSearch, formatter} = useTable({queryFn: queryRoleList})-->

<!--    refresh()-->
<!--    queryMenuList()-->

<!--    return {-->
<!--      dataForm,-->
<!--      ...toRefs(state),-->
<!--      handleDelete,-->
<!--      handleCreate,-->
<!--      handleEdit,-->
<!--      createData,-->
<!--      updateData,-->
<!--      refresh,-->
<!--      handleSearch,-->
<!--      formatter-->
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