<template>
  <div class="page-sidebar">
    <div class="page-sidebar__logo" @click="toHome">
      <img src="@/assets/logo.png" class="logo">
      <span class="title" v-if="!sidebarMenuCollapse">RIC-ADMIN</span>
    </div>
    <div class="page-sidebar__menu sidebar-menu">
      <el-menu
          :unique-opened="true"
          :default-active="$route.path"
          :collapse="sidebarMenuCollapse"
          :collapse-transition="false"
          @select="onJump"
          background-color="#1E2022"
          text-color="#FFFFFF"
          active-text-color="#FFFFFF"
      >
        <sidebar-item v-for="route in menuStore.menuList" :key="route.path" :item="route"/>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import SidebarItem from './sidebarItem.vue'
import useMenuStoreInstance from "../../store/menu";
import {useRouter} from "vue-router";
import {computed} from "vue";

const menuStore = useMenuStoreInstance()
const router = useRouter()
const route = useRoute()

const sidebarMenuCollapse = computed(() => menuStore.sidebarMenuCollapse)

const onJump = (path) => {
  if (path !== route.path) {
    router.push(path)
  }
}
</script>

<style scoped lang="scss">

.page-sidebar {
  height: 100%;
  background-color: $page-sidebar-bg;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    cursor: pointer;

    .logo {
      width: 30px;
      height: 30px;
    }

    .title {
      color: #FFFFFF;
      font-weight: bold;
      font-size: 26px;
      margin-left: 10px;
      white-space: nowrap;
    }
  }

  &__menu {
    height: calc(100% - 80px);
    overflow-y: auto;

    :deep(.el-sub-menu, .el-menu) {
      border: none;
    }
  }
}

</style>

<style lang="scss">
/** 修改 menu 选中悬停的背景色 **/
.el-menu .el-sub-menu__title.is-active,
.el-menu .el-sub-menu__title:hover,
.el-menu .el-menu-item.is-active,
.el-menu .el-menu-item:hover {
  background-color: #4c70e3 !important;
  color: #fff;
}

.el-menu {
  border-right-width: 0;
}
</style>