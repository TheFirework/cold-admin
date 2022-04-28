<template>
  <div class="menu-icons">
    <el-popover
        ref="popover"
        placement="bottom-start"
        popper-class="popper-menu-icon"
        trigger="click"
        width="480"
    >
      <el-row :gutter="10" class="list">
        <el-col v-for="(item, index) in list" :key="index" :span="3">
          <el-button
              :class="{ 'is-active': item === value }"
              size="mini"
              @click="onSelect(item)"
          >
            <svg-icon :name="item"/>
          </el-button>
        </el-col>
      </el-row>

      <template #reference>
        <el-input :value="value" placeholder="请选择" readonly></el-input>
        <svg-icon :name="value"/>
      </template>
    </el-popover>
  </div>
</template>

<script>
import * as ElementIcons from '@element-plus/icons-vue'
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