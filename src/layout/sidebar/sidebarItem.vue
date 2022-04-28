<template>
  <template v-if="item.meta.isShow">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
      <template #title>
        <svg-icon :name="item.meta.icon" v-if="item.meta.icon"/>
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :item="child"/>
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <svg-icon :name="item.meta.icon" v-if="item.meta.icon"/>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
})
const hasChildren = computed(() => {
  return props.item.children.length > 0
})
</script>

<style scoped>

</style>