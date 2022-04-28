<template>
  <div class="role-tree">
    <p>{{ title }}</p>

    <el-input v-model="keyword" placeholder="输入关键字进行过滤" size="small"></el-input>

    <div class="scroller">
      <el-tree
        ref="tree"
        :data="list"
        :default-checked-keys="checked"
        :filter-node-method="filterNode"
        :props="props"
        highlight-current
        node-key="id"
        show-checkbox
        @check-change="save"
      ></el-tree>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch, toRefs } from 'vue';

export default {
  name:'RoleTree',
  props: {
    value: Array,
    title: String,
    data: Array,
  },
  setup(props, context) {
    const tree = ref(null);
    const state = reactive({
      list: props.data,
      checked: [],
      keyword: '',
      props: {
        label: 'name',
        children: 'children',
      },
    });

    const refreshTree = (value) => {
      if (!value) {
        state.checked = [];
      }

      let ids = [];

      // 处理半选状态
      let fn = (list) => {
        list.forEach((e) => {
          if (e.children) {
            fn(e.children);
          } else {
            ids.push(Number(e.id));
          }
        });
      };

      fn(state.list);
      state.checked = ids.filter((id) => (value || []).includes(id));
    };

    const filterNode = (val, data) => {
      if (!val) return true;
      return data.name.includes(val);
    };

    const save = () => {
      const treeRef = tree.value;
      // 选中的节点
      const checked = treeRef.getCheckedKeys();
      // 半选中的节点
      const halfChecked = treeRef.getHalfCheckedKeys();

      context.emit('update:value', [...checked, ...halfChecked]);
    };

    watch(
      () => state.keyword,
      (value) => {
        tree.value.filter(value);
      }
    );

    watch(
      () => props.value,
      (value) => {
        refreshTree(value);
      },
      {
        immediate: true,
      }
    );

    return {
      tree,
      ...toRefs(state),
      filterNode,
      save,
    };
  },
};
</script>

<style lang="scss" scoped>
.scroller {
  border: 1px solid #dcdfe6;
  margin-top: 5px;
  border-radius: 3px;
  height: 200px;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 5px 0;
}
</style>