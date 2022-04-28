<template>
  <el-icon class="svg-icon" :size="size" :color="color">
    <Component :is="name"/>
  </el-icon>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [String,Number],
  },
  color: {
    type: String,
  },
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: inherit;
}
</style>