<template>
  <div class="navbar-container">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in list" :key="index">
        {{ item.meta.title || item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import _ from "lodash";
import useMenuStoreInstance from "../../store/menu";
import {useCore} from "../../core/hook";

const menuStore = useMenuStoreInstance()
const {route, router} = useCore()
const list = ref([])

watch(
    () => route.path,
    () => {
      const deep = (item) => {
        if (route.path === "/") {
          return false;
        }
        if (item.path === route.path) {
          return item;
        } else {
          if (item.children) {
            const ret = item.children.map(deep).find(Boolean);

            if (ret) {
              return [item, ret];
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      }

      list.value = _(menuStore.menuList)
          .map(deep)
          .filter(Boolean)
          .flattenDeep()
          .value()

      if (_.isEmpty(list.value)) {
        list.value.push(route);
      }
    },
    {
      immediate: true,
    }
)

</script>

<style scoped lang="scss">
.navbar-container {
  white-space: nowrap;

  .el-breadcrumb {
    margin: 0 10px;

    &__inner {
      font-size: 13px;
      padding: 0 10px;
      font-weight: normal;
      letter-spacing: 1px;
    }
  }
}
</style>