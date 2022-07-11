<template>
  <div ref="container" class="tag-view-wrap">
    <scroll>
      <div
          v-for="(item, index) in list"
          :key="index"
          :class="{ active: item.active }"
          :data-index="index"
          class="block"
          @mousedown="(e) => onTap(e, item,index)"
      >
        <span>{{ item.label }}</span>
        <el-icon @mousedown.stop="onDel(index)">
          <close/>
        </el-icon>
      </div>
    </scroll>

    <ul v-show="menu.visible" :style="menu.style" class="contextmenu">
      <li @click="onClose('refresh')">刷新</li>
      <li @click="onClose('close')">关闭</li>
      <li @click="onClose('other')">关闭其他</li>
      <li @click="onClose('all')">关闭所有</li>
    </ul>
  </div>
</template>

<script setup>
import useTagViewStoreInstance from "../../store/tagView";
import useCore from "../../core/hook";
import {computed, onMounted, ref} from "vue";
import Scroll from "./scroll.vue";

const tagViewStore = useTagViewStoreInstance()
const {router} = useCore()
const container = ref(null)
const currentIndex = ref()
const menu = ref({
  visible: false,
  current: {},
  style: {
    left: 0,
    top: 0,
  },
})
const isHit = ref(false)

const list = computed(() => {
  return tagViewStore.list;
})

onMounted(() => {
  container.value.oncontextmenu = () => {
    return false;
  };
  document.body.addEventListener('click', (e) => {
    if (menu.value.visible) {
      menu.value.visible = false;
    }
  })
})

function onTap(e, item, index) {
  currentIndex.value = index
  isHit.value = item.active && item.value !== '/';
  if (e.button === 0) {
    router.push(item.value);
  } else {
    menu.value = {
      current: item,
      visible: true,
      style: {
        left: e.layerX + 'px',
        top: e.layerY + 'px',
      },
    }
  }
}

function onDel(index) {
  tagViewStore.remove(index)
  toPath()
}

function toPath() {
  const active = tagViewStore.list.find((e) => e.active);
  if (!active) {
    const next = tagViewStore.list[tagViewStore.list.length - 1];
    router.push(next ? next.value : '/');
  }
}

function onClose(name) {
  const {current} = menu.value
  switch (name) {
    case 'refresh':
      router.push(`/refresh?path=${current.value}`)
      break;

    case 'close':
      onDel(currentIndex.value)
      break;

    case 'other':
      tagViewStore.set(tagViewStore.list.filter((e) => e.value === current.value || e.value === '/'))
      break;

    case 'all':
      tagViewStore.set(tagViewStore.list.filter((e) => e.value === '/'))
      break;
  }
  toPath()
}

</script>

<style scoped lang="scss">
.tag-view-wrap {
  width: 100%;
  display: flex;
  height: 30px;
  position: relative;

  .block {
    display: inline-block;
    border-radius: 3px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    background-color: #fff;
    font-size: 12px;
    margin-right: 10px;
    color: #909399;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    i {
      font-size: 14px;
      position: relative;
      top: 3px;
      width: 0;
      overflow: hidden;
      transition: all 0.3s;

      &:hover {
        background-color: #fff;
      }
    }

    &:hover {
      i {
        width: auto;
        margin-left: 5px;
      }
    }

    &.active {
      span {
        color: #4165d7;
      }

      i {
        width: auto;
        margin-left: 5px;
      }

      &:before {
        background-color: #4165d7;
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>