<template>
  <div>
    <upload-image/>
    <upload ref="uploadRef"
            :tips="'支持文件格式：.rar .zip .doc .docx .pdf ，单个文件不能超过1mb'"
            :action="'/file-admin/file/uploadViolation'"
            fileName="'file'"
            :fileList="attachmentList"
            @success="fileChange"
            @remove="fileChange"/>
  </div>
</template>

<script setup>
import {ref} from "vue";
const uploadRef = ref(null)
const attachmentList = ref([])
const fileChange = (uploadObject) => {
  const fileList = Object.values(uploadObject);
  attachmentList.value = fileList;
}
const clearFileList = () => {
  uploadRef.value.clearAll()
}
</script>

<style scoped>

</style>