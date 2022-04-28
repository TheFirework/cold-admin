<template>
  <CropImage
      v-model:visible="visible"
      :file="file"
      @submit="onCropSubmit"
  >
  </CropImage>
  <el-button @click="visible = true">裁剪图片</el-button>
</template>

<script setup>
import CropImage from '@/components/cropper/index.vue'
import {ref} from "vue";

const visible = ref(false)
const file = ref(null)
const resolveFile = ref(null)

function onCropSubmit(file) {
  console.log(file)
}
</script>

<style scoped>

</style>