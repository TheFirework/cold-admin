<template>
  <div class="table-wrapper" >
    <el-table ref="table"
              :data="data"
              :border="border"
              :stripe="stripe"
              :row-key="rowKey"
              :fit="fit"
              v-bind="$attrs"
              :max-height="maxHeight"
              :size="size"
              @selection-change="selectionChange"
    >
      <!-- 多选 -->
      <el-table-column v-if="showSelection" type="selection" fixed="fixed" width="55"/>
      <!-- 序号   -->
      <el-table-column v-if="showIndex" type="index" width="55"/>
      <template v-for="column in columns">
        <!--        slot-->
        <el-table-column
            v-if="column.slotName"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :fixed="column.fixed"
            :align="column.align ? column.align : 'center'"
        >
          <template #default="scope">
            <slot :name="column.slotName" :row="scope.row"/>
          </template>
        </el-table-column>
        <!--        普通文本-->
        <el-table-column
            v-else
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :fixed="column.fixed"
            :align="column.align ? column.align : 'center'"
            :formatter="column.formatter"
            min-width="50"
        />
      </template>
      <!-- 操作-->
      <el-table-column v-if="action" align="center" fixed="right" label="操作" >
        <template #default="scope">
          <slot name="handler" :row="scope.row" :column="scope.column" :$index="scope.$index"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="showPagination">
      <el-pagination
          small
          v-model:currentPage="pagination.current"
          v-model:page-size="pagination.size"
          background
          :layout="layout"
          :page-sizes="pageSizes"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomTable'
}
/**
 *  columns  表头配置
 *  prop
 *  label
 *  width
 *  fixed
 *  align
 *  formatter
 *  slotName  自定义动态 slot
 *
 *  pagination 分页配置
 *  current 当前页数
 *  size  每页显示条目个数
 *  total     总条目数
 */
</script>
<script setup>
import {ref} from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  columns: {
    type: Array,
    default: [],
    required: true
  },
  load:{
    type:Function,
    default:()=>{}
  },
  showPagination: Boolean,
  pagination: {
    type: Object,
    default: {
      total: 0,
      current: 0,
      size: 10,
    }
  },
  showSelection: Boolean,
  showIndex: Boolean,
  stripe: Boolean,
  action: Boolean,
  rowKey: {
    type: String,
    default: 'id'
  },
  border: {
    type: Boolean,
    default: true
  },
  fit: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'small'
  },
  maxHeight: {
    type: [String, Number],
    default: 700
  },
})

const emits = defineEmits(['load','update:pagination','selection-change','size-change', 'current-change'])

const table = ref(null)

const pageSizes = ref([10, 20, 30, 50, 100])
const layout = 'total, sizes, prev, pager, next, jumper'

const selectionChange = (val) => {
  emits('selection-change', val)
}

const handleSizeChange = (size) => {
  emits('size-change', size)
  emits('update:pagination',{
    ...props.pagination,
    size
  })
  emits('load')
}

const handleCurrentChange = (current) => {
  emits('current-change', current)
  emits('update:pagination',{
    ...props.pagination,
    current
  })
  emits('load')
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>