<template>
  <div class="tinymce-box" v-loading="loading">
    <textarea :id="id" class="tinymce-textarea"></textarea>
  </div>
</template>

<script setup>

import {nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";
import plugins from "./plugins";
import toolbar from "./toolbar";
import font from "./font";
import {ElMessage} from "element-plus";
import asyncLoadScript from "../../core/utils/async-script";
import {getRandomStr} from "../../core/utils/string";

const scriptSrc = import.meta.env.BASE_URL + 'tinymce/tinymce.min.js'
const menubar = ['file', 'edit', 'insert', 'view', 'format', 'table', 'tools']

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 360
  },
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  toolbar: {
    type: Array,
    default: () => toolbar
  },
  menubar: {
    type: Array,
    default: () => ['file', 'edit', 'insert', 'view', 'format', 'table', 'tools']
  }
})

const emit = defineEmits(['update:value','blur'])

const loading = ref(false)
const id = ref('editor'+ getRandomStr())
const hasChange = ref(false)
const hasInit = ref(false)
const editorInstance = ref(null)

watch(()=>props.value,val=>{
  if(hasInit.value && !hasChange.value){
    nextTick(()=>{
      if(editorInstance.value){
        editorInstance.value.setContent(val||'')
      }
    })
  }
})

onMounted(()=>{
  asyncLoadScript(scriptSrc,window.tinymce,err=>{
    loading.value = false
    if(err){
      ElMessage.error('加载富文本编辑器失败')
    }
    initTinymce()
  })
})

onBeforeUnmount(() => {
  editorInstance.value && editorInstance.value.remove()
})

function initTinymce(){
  window.tinymce.init({
    selector:'#'+id.value,
    language: 'zh_CN',
    content_style: 'img {max-width:100%;}',
    placeholder: props.placeholder,
    min_height: props.height,
    height: props.height,
    object_resizing: false,
    plugins,
    toolbar: props.toolbar,
    menubar: props.menubar.join(' '),
    fontsize_formats: '12px 14px 16px 18px 20px 24px 36px',
    font_formats: font,
    autosave_ask_before_unload: false,
    branding: false, // 隐藏编辑器界面右下角的“Powered by Tiny”（官方汉化为：由Tiny驱动）字样
    contextmenu: 'bold copy',
    elementpath: false, // 隐藏底栏的元素路径
    statusbar: false,
    toolbar_mode: 'wrap', // 工具栏布局模式
    quickbars_insert_toolbar: '', // [插入]快捷工具栏
    quickbars_selection_toolbar: '', // [选择]快捷工具栏
    fullpage_default_font_size: '14px',
    init_instance_callback: editor => {
      editorInstance.value = editor
      if (props.value) {
        editor.setContent(props.value)
      }
      hasInit.value = true
      editor.on('keyup input', () => {
        hasChange.value = true
      })
      editor.on('NodeChange Change keyup', () => {
        const val = editor.getContent()
        // const val = editor.getBody().innerHTML
        emit('update:value', val)
        // self.dispatch('ElFormItem', 'el.form.change', [val])
      })
      editor.on('blur', () => {
        emit('blur')
        // self.dispatch('ElFormItem', 'el.form.blur', [props.value])
      })
    },
    imageSelectorCallback(file, success) {
      // async upload file
      const reader = new FileReader()
      reader.onload = e => {
        if (e.target && e.target.result) {
          success(e.target.result)
        }
      }
      reader.readAsDataURL(file)
    }
  })
}

</script>

<style scoped>
.tinymce-textarea {
  visibility: hidden;
}
</style>