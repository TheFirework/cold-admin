<template>
  <div class="upload-container">
    <div class="upload-container">
      <el-upload
          ref="uploadRef"
          :name="fileName"
          :limit="limit"
          :accept="accept"
          :multiple="true"
          :file-list="defaultFileList"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          class="editor-slide-upload"
          :action="action"
      >
        <el-button size="small" type="primary"> 点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">{{ tips }}</div>
        </template>
      </el-upload>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  tips: {
    type: String,
    default: '',
  },
  action: {
    type: String,
    default: '',
  },
  limit: {
    type: Number,
    default: 5,
  },
  accept: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: 'file',
  },
  fileList: {
    type: Array,
    default: [],
  },
})
const emit = defineEmits(['success','remove','change'])
const uploadRef = ref(null)

</script>

<style scoped lang="scss">

</style>