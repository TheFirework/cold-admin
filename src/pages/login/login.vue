<template>
  <div class="login-page">
    <el-form ref="formRef" :model="loginForm" :rules="rules" class="login-form">
      <h3 class="title">RIC 管理后台</h3>
      <div class="form-content">
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" placeholder="用户名" size="large"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password size="large"/>
        </el-form-item>
        <el-form-item label="" prop="verifyCode">
          <el-input v-model="loginForm.verifyCode" maxlength="4" placeholder="验证码"></el-input>
          <div class="captcha" @click="queryCaptcha">
            <img v-if="codeImage" :src="codeImage" alt="captcha">
          </div>
        </el-form-item>
        <el-button :loading="loading" type="text" size="large" class="submit" @click.prevent="handleLogin">登录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import useUserStoreInstance from "../../store/user";
import useMenuStoreInstance from "../../store/menu";
import useCore from "../../core/hook";
import UserService from "../../api/user";

const userStore = useUserStoreInstance(), menuStore = useMenuStoreInstance()
const {route, router} = useCore()

const state = reactive({
  loading: false,
  loginForm: {
    phone: '18888888888',
    password: '123456',
    verifyCode: '',
    codeToken: ''
  },
  rules: {
    phone: [{required: true, message: "请输入手机号"}],
    password: [{required: true, message: "请输入密码"}],
    verifyCode: [{required: true, message: '请输入验证码'}],
  },
  codeImage: '',
})

const redirect = ref(null)
const formRef = ref(null)

onMounted(() => {
  redirect.value = route.query.redirect ?? '/'
})

const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      state.loading = true
      try {
        await userStore.login(state.loginForm)
        // await userStore.queryUserInfo()
        await menuStore.queryMenuList()
        router.push(redirect.value)
      } catch (e) {
        state.loading = false
      }
    }
  })
}

const queryCaptcha = async () => {
  const result = await UserService.getCaptcha()
  if (result.code === 10000) {
    state.codeImage = result.data.codeImage
    state.loginForm.codeToken = result.data.codeToken
  }
}

queryCaptcha()

const {loading, loginForm, rules,codeImage} = toRefs(state)
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

.captcha {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100px;
  height: 32px;
  cursor: pointer;

  img{
    width: 100%;
    height: 100%;
  }
}
</style>