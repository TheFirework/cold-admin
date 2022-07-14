<template>
  <div class="menu-icons">
    <el-popover
        ref="popover"
        placement="bottom"
        popper-class="popper-menu-icon"
        trigger="click"
        width="480"
    >
      <el-row :gutter="10" class="list">
        <el-col v-for="(item, index) in list" :key="index" :span="3">
          <el-button
              :class="{ 'is-active': item === value }"
              size="small"
              @click="onSelect(item)"
          >
            <svg-icon :name="item"/>
          </el-button>
        </el-col>
      </el-row>

      <template #reference>
        <div class="menu-content">
          <el-input v-model="value" placeholder="请选择" class="menu-input" readonly/>
          <div class="menu-icon">
            <svg-icon :name="value"/>
          </div>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script>
import * as ElementIcons from '@element-plus/icons-vue'
import {onMounted, reactive, ref, toRefs} from "vue";

const iconsList = Object.keys(ElementIcons)

export default {
  name: "MenuIcons",
  props: {
    value: String,
  },
  setup(props, context) {
    const popover = ref(null)
    const state = reactive({
      list: [],
    });

    const onSelect = (icon) => {
      context.emit("update:value", icon);
    };

    onMounted(() => {
      state.list = iconsList;
    });


    return {
      popover,
      ...toRefs(state),
      onSelect,
    };
  },
};
</script>

<style lang="scss">
.menu-icons {
  width: 100%;
}

.menu-content {
  display: flex;
  align-items: center;

  .menu-input {
    width: 500px;
  }

  .menu-icon {
    margin-left: 20px;
  }
}

.popper-menu-icon {
  width: 480px;
  box-sizing: border-box;

  .list {
    height: 250px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
  }

  .el-button {
    margin-bottom: 10px;
    height: 40px;
    width: 100%;
    padding: 0;

    .icon-svg {
      font-size: 18px;
      color: #444;
    }
  }
}
</style>