<template>
  <div class="menu-tree">
    <el-popover
        ref="popover"
        placement="bottom-start"
        popper-class="popper-menu-tree"
        trigger="click"
        width="480"
    >
      <el-input v-model="filterValue" size="small">
        <template #prefix>
          <i class="el-input__icon el-icon-search"></i>
        </template>
      </el-input>

      <el-tree
          ref="tree"
          :data="treeList"
          :default-expanded-keys="expandedKeys"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :props="props"
          node-key="id"
          @current-change="currentChange"
      >
      </el-tree>

      <template #reference>
        <el-input :value="name" placeholder="请选择" readonly></el-input>
      </template>
    </el-popover>
  </div>
</template>

<script>
import {reactive, ref, toRefs, computed, watch, onMounted} from "vue";
import {deepTree} from "../../core/utils/array";

export default {
  name: "MenuTree",
  props: {
    value: [String, Number],
    menuList: Array,
  },
  setup(props, context) {
    const tree = ref(null);
    const popover = ref(null);
    const state = reactive({
      filterValue: "",
      list: [],
      props: {
        label: "name",
        children: "children",
      },
      expandedKeys: [],
    });

    watch(
        () => state.filterValue,
        (value) => {
          tree.value.filter(value);
        }
    );

    const treeList = computed(() => {
      return deepTree(state.list);
    });

    const name = computed(() => {
      const item = props.menuList.find((e) => e.id == props.value);
      return item ? item.name : "一级菜单";
    });

    const currentChange = ({id}) => {
      context.emit("update:value", id);
    };

    const initMenuList = () => {
      let list = props.menuList.filter((e) => e.type != 2);
      list.unshift({
        name: "一级菜单",
        id: 0,
      });
      state.list = list;
    };

    const filterNode = (value, data) => {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    };

    onMounted(() => {
      initMenuList();
    });

    return {
      popover,
      tree,
      ...toRefs(state),
      treeList,
      name,
      currentChange,
      filterNode,
    };
  },
};
</script>

<style lang="scss">
.popper-menu-tree {
  width: 480px;
  box-sizing: border-box;

  .el-input {
    margin-bottom: 10px;
  }

  .el-tree {
  }
}
</style>