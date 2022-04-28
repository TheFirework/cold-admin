<template>
  <div>
    <tinymce-editor v-model:value="content" placeholder="请输入"/>
  </div>
</template>

<script setup>
import TinymceEditor from '@/components/Tinymce/index.vue'

const content = ref(`\n<p><span style=\"font-size: 20px; font-family: 'PingFang SC';\">题目：给定一个天平，选择4个砝码，并使用这些砝码称出1-40g里所有整数的重量。</span></p>\n`)
</script>

<style scoped>

</style>