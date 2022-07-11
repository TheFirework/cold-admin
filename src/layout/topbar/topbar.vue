<template>
  <div class="topbar-container">
    <div class="topbar__collapse" @click="collapse">
      <svg-icon :name="sidebarMenuCollapse ? 'expand' : 'fold'"/>
    </div>
    <div class="topbar__navbar">
      <navbar/>
    </div>
    <div class="space"></div>
    <div class="topbar__user">
      <el-dropdown :hide-on-click="false" trigger="click" @command="onCommand">
        <span class="el-dropdown-link">
          <span class="name">{{ userStore.nickname }}</span>
          <el-avatar :size="32" :src="userStore.avatar"></el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import Navbar from './navbar.vue'
import {computed} from "vue";
import useCore from "../../core/hook";
import useUserStore from "../../store/user";
import useMenuStoreInstance from "../../store/menu";

const {router} = useCore(), userStore = useUserStore()
const menuStore = useMenuStoreInstance()

const sidebarMenuCollapse = computed(() => menuStore.sidebarMenuCollapse)

function collapse() {
  menuStore.collapse(!sidebarMenuCollapse.value)
}

function onCommand(name) {
  switch (name) {
    case 'userInfo':
      router.push('/profile/setting')
      break;
    case 'logout':
      userStore.logout()
      break;
  }
}
</script>

<style scoped lang="scss">
.topbar-container {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  background-color: #FFFFFF;
}

.topbar__collapse {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  cursor: pointer;

  i {
    font-size: 24px;
    color: #666;
  }
}

.space {
  flex: 1;
}

.topbar__user {
  cursor: pointer;
  margin-right: 10px;

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }

  .name {
    white-space: nowrap;
    margin-right: 15px;
  }
}

</style>