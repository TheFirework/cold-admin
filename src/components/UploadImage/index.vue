<template>
  <el-upload
      class="upload-demo"
      ref="uploadRef"
      :multiple="multiple"
      :limit="limit"
      :auto-upload="autoUpload"
      :before-upload="beforeUpload"
      :accep="accept"
      :http-request="httpRequest"
      :show-file-list="false"
  >
    <template #trigger>
      <el-button type="primary">选择图片</el-button>
    </template>
    <el-button type="primary" @click="submitUpload">上传</el-button>
  </el-upload>
</template>

<script setup>
import {computed, ref} from "vue";
import {ElMessage} from "element-plus";

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: () => []
  },
  type: {
    type: String,
    default: "image"
  },
  limit: {
    type: Number,
    default: 1
  },
  multiple: {
    type: Boolean,
    default: false
  },
  autoUpload: {
    type: Boolean,
    default: false
  },
  limitSize: Number,
})

const emit = defineEmits(["update:modelValue",])

const uploadRef = ref(null)

// 文件格式
const accept = computed(() => {
  return props.type === "file" ? "*" : "image/*";
})

const beforeUpload = (file) => {
  if (file.size / 1024 / 1024 >= props.limitSize) {
    ElMessage.error(`上传文件大小不能超过 ${props.limitSize}MB!`);
    return false;
  }
  return true
}

const httpRequest = (options) => {
  let file = options.file
  console.log(file)
  // ajax 请求上传文件
}

const submitUpload = () => {
  uploadRef.value.submit()
}
</script>

<style lang="scss" scoped>
</style>