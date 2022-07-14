<template>
  <el-dialog v-model="visible" :close-on-click-modal="false" :title="dialogTitleMap[dialogStatus]"
             :show-close="showClose"
             :before-close="beforeClose"
             :destroy-on-close="destroyOnClose"
             :width="width">
    <slot/>
    <template #footer>
      <slot name="footer">
        <el-button v-if="showConfirm" @click="onCancel">{{ cancelBtnText }}</el-button>
        <el-button v-if="ShowCancel" type="primary" @click="onConfirm">{{ confirmBtnText }}</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "CustomDialog"
}
</script>

<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  modelValue: Boolean,
  dialogStatus: {
    type: String,
    default: 'update'
  },
  width: {
    type: [String, Number],
    default: '650px'
  },
  showClose: Boolean,
  destroyOnClose: {
    type: Boolean,
    default: true
  },
  showConfirm: {
    type: Boolean,
    default: true
  },
  ShowCancel: {
    type: Boolean,
    default: true
  },
  confirmBtnText: {
    type: String,
    default: '确定'
  },
  cancelBtnText: {
    type: String,
    default: '取消'
  },
})

const dialogTitleMap = {
  update: "编辑",
  create: "新增",
}

const visible = ref(false)

watch(() => props.modelValue, value => {
  visible.value = value
}, {
  immediate: true
})

const emits = defineEmits(['before-close','confirm','cancel','update:modelValue'])

const beforeClose = () => {
  emits('before-close')
}

const onConfirm = () => {
  emits('confirm')
}

const onCancel = () => {
  emits('cancel')
  emits('update:modelValue', false)
}
</script>

<style scoped>

</style>