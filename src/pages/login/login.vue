<template>
  <div class="login-page">
    <el-form ref="formRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">COLD-ADMIN 管理后台</h3>
      <div class="form-content">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="用户名" size="large"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password size="large"/>
        </el-form-item>
        <el-button :loading="loading" type="text" size="large" class="submit" @click.prevent="handleLogin">登录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {useUserStoreInstance} from "../../store/user";
import {useMenuStore} from "../../store/menu";
import {useCore} from "../../core/hook";

const userStore = useUserStoreInstance(), menuStore = useMenuStore()
const {route, router} = useCore()

const redirect = ref(null)
const formRef = ref(null)
const loading = ref(false)
const loginForm = reactive({
  account: null,
  password: null,
})
const loginRules = reactive({
  account: [
    {required: true, trigger: 'blur', message: '请输入用户名'}
  ],
  password: [
    {required: true, trigger: 'blur', message: '请输入密码'},
  ]
})
onMounted(() => {
  redirect.value = route.query.redirect ?? '/'
})

function handleLogin() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        await userStore.login(loginForm)
        await userStore.queryUserInfo()
        await menuStore.queryMenuList()
        router.push(redirect.value)
      } catch (e) {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped lang="scss">
.login-page {
  width: 100%;
  height: 100%;
  background: #1E2022;
  display: flex;
  justify-content: center;
}

.login-form {
  margin-top: 160px;
  width: 400px;
  padding: 30px 35px;
  box-sizing: border-box;

  .title {
    font-size: 22px;
    color: #FFFFFF;
    text-align: center;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 100px;
  }

  .form-content {
    margin-top: 50px;

    .submit {
      width: 100%;
      margin-top: 20px;
      background-color: #FFFFFF;
      color: #1E2022;
    }
  }
}
</style>