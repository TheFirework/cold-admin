<template>
  <el-dialog v-model="visible" custom-class="dialog-wrap" @close="onClose" destroy-on-close
             :close-on-click-modal="false">
    <div class="dialog-container">
      <div class="img-box bg">
        <img ref="imageEl" class="cropper-image"/>
      </div>
      <div class="control-container">
        <div ref="previewEl" class="preview-box bg"></div>
        <div class="control">

          <el-button-group>
            <el-button type="primary" @click="setAspectRatio(16/9)">16:9</el-button>
            <el-button type="primary" @click="setAspectRatio(4/3)">4:3</el-button>
            <el-button type="primary" @click="setAspectRatio(1)">1:1</el-button>
            <el-button type="primary" @click="setAspectRatio(2/3)">2:3</el-button>
            <el-button type="primary" @click="setAspectRatio(0)">Free</el-button>
          </el-button-group>

        </div>
      </div>
    </div>
    <div class="actions">
      <el-button-group>
        <el-button type="primary" @click="onZoom(-0.1)">
          <el-icon>
            <zoom-out/>
          </el-icon>
        </el-button>
        <el-button type="primary" @click="onZoom(0.1)">
          <el-icon>
            <zoom-in/>
          </el-icon>
        </el-button>
      </el-button-group>

      <el-button-group>
        <el-button type="primary" @click="onRotate(-45)">
          <el-icon>
            <refresh-right/>
          </el-icon>
        </el-button>
        <el-button type="primary" @click="onRotate(45)">
          <el-icon>
            <refresh-left/>
          </el-icon>
        </el-button>
      </el-button-group>

      <el-button-group>
        <el-button type="primary" @click="onMove(-moveStep, 0)">
          <el-icon>
            <back/>
          </el-icon>
        </el-button>
        <el-button type="primary" @click="onMove(moveStep, 0)">
          <el-icon>
            <right/>
          </el-icon>
        </el-button>
        <el-button type="primary" @click="onMove(0, -moveStep)">
          <el-icon>
            <top/>
          </el-icon>
        </el-button>
        <el-button type="primary" @click="onMove(0, moveStep)">
          <el-icon>
            <bottom/>
          </el-icon>
        </el-button>
      </el-button-group>

      <el-button-group>
        <el-button type="primary" @click="onScaleX">
          <el-icon>
            <Switch/>
          </el-icon>
        </el-button>
        <el-button type="primary" @click="onScaleY">
          <el-icon>
            <sort/>
          </el-icon>
        </el-button>
      </el-button-group>

      <el-button-group>
        <el-button type="primary" @click="onCrop">
          <el-icon><Select/></el-icon>
        </el-button>
        <el-button type="primary" @click="onClear">
          <el-icon>
            <close-bold/>
          </el-icon>
        </el-button>
      </el-button-group>

      <el-button-group>
        <el-button type="primary" @click="onDisable">
          <el-icon>
            <lock/>
          </el-icon>
        </el-button>
        <el-button type="primary" @click="onEnable">
          <el-icon>
            <unlock/>
          </el-icon>
        </el-button>
      </el-button-group>

      <el-button-group>
        <el-button type="primary" @click="onReset">
          <el-icon>
            <refresh/>
          </el-icon>
        </el-button>
        <el-button type="primary" @click="onDestroy">
          <el-icon>
            <switch-button/>
          </el-icon>
        </el-button>
      </el-button-group>

      <el-upload class="select-img" accept="image/*" :auto-upload="false" :on-change="onSelectImage"
                 :show-file-list="false">
        <el-button type="primary">
          <el-icon>
            <upload/>
          </el-icon>
        </el-button>
      </el-upload>

      <el-button type="primary" style="margin-left: 10px;" @click="onConfirm">保存图片</el-button>

    </div>
  </el-dialog>
</template>

<script setup>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import {ref, watch} from "vue";
import {fileToDataURI} from "../../core/utils/image";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  moveStep: {
    type: Number,
    default: 4
  },
  file: {
    type: Object
  }
})
const emit = defineEmits(['update:visible', 'submit'])

const imageEl = ref(null)
const previewEl = ref(null)
const instance = ref(null)
const show = ref(false)
const file = ref(props.file)

watch(() => props.visible, newVal => {
  show.value = props.visible
  if (newVal) {
    setTimeout(() => {
      if (imageEl.value && previewEl.value) {
        instance.value = new Cropper(imageEl.value, {
          preview: previewEl.value,
          checkCrossOrigin: false
        })
        if (props.file) {
          fileToDataURI(props.file).then(url => {
            instance.value?.replace(url)
          })
        }
      }
    }, 20)
  } else {
    instance.value?.destroy()
  }
})

function onClose() {
  emit('update:visible', false)
}

function onConfirm() {
  instance.value?.getCroppedCanvas().toBlob(blob => {
    let newFile
    if (blob && file) {
      const {type, name, uid} = file.value
      newFile = new File([blob], name, {type})
      newFile.uid = uid
      emit('submit', newFile)
      emit('update:visible', false)
    }
  })
}


function onZoom(ratio) {
  instance.value?.zoom(ratio)
}

function onRotate(degree) {
  instance.value?.rotate(degree)
}


function onReset() {
  instance.value?.reset()
}

function onDestroy() {
  instance.value?.destroy()
}

function onMove(...rest) {
  instance.value?.move(...rest)
}

function onScaleX() {
  instance.value?.scaleX(-instance.value?.getData().scaleX)
}

function onScaleY() {
  instance.value?.scaleY(-instance.value?.getData().scaleY)
}

function onClear() {
  instance.value?.clear()
}

function onCrop() {
  instance.value?.crop()
}

function onDisable() {
  instance.value?.disable()
}

function onEnable() {
  instance.value?.enable()
}

function setAspectRatio(ratio) {
  instance.value?.setAspectRatio(ratio)
}

function onSelectImage(uploadFile) {
  file.value = {
    name: uploadFile.name,
    uid: uploadFile.uid,
    type: uploadFile.raw.type
  }
  fileToDataURI(uploadFile.raw).then(url => {
    instance.value?.replace(url);
  })
}

</script>

<style scoped lang="scss">
.bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}

.dialog-wrap {
  width: 840px !important;
}

.cropper-container {
  display: flex;
  align-items: center;
}

.img-box {
  display: inline-block;
  height: 340px;
  width: 480px;
  border: 1px solid #ebebeb;

  img {
    max-width: 100%;
    display: block;
  }
}

.control-container {
  display: inline-block;
  width: 350px;
  padding: 0 10px;
  vertical-align: top;
}

.preview-box {
  height: 150px !important;
  width: 150px !important;
  overflow: hidden;
  border: 1px solid #ebebeb;
}

.control {
  margin-top: 15px;
}

.control ::v-deep(.el-button) {
  margin-right: 8px;
  margin-bottom: 15px;
}

.reset-button {
  width: 100%;
}

.select-img {
  display: inline-block;
}

.actions {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.actions ::v-deep(.el-button-group) {
  margin-right: 8px;
}
</style>