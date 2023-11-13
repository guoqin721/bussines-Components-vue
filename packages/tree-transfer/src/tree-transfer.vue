<template>
  <div class="card-list">
      <!-- 左侧全部 -->
      <el-card class="box-card">
          <template #header>
              <div class="card-header">
                  <div class="header-title">全部</div>
                  <el-input v-model="states.allSearchValue" placeholder="名称">
                      <template #suffix>
                        <el-icon @click="searchUser('left')">
                            <Search />
                        </el-icon>
                      </template>
                  </el-input>
              </div>
          </template>
          <div>
              <el-tree ref="treeLeftRef" :data="states.treeData" default-expand-all show-checkbox
                  :props="states.treeProps" node-key="id" :filter-node-method="filterNode"
                  :default-checked-keys="states.defaultChecked" @check="selectedList('left')"/>
          </div>
      </el-card>
      <el-button type="primary"  @click="handleCancelCheck" :disabled="!states.hasSelectionSonRightList.length">
        <el-icon><ArrowLeft /></el-icon>
      </el-button>
      <el-button type="primary" @click="handleCheckChange" :disabled="!states.hasSelectionSonLeftList.length">
        <el-icon><ArrowRight /></el-icon>
      </el-button>
      <!-- 右侧已选择的 -->
      <el-card class="box-card">
          <template #header>
              <div class="card-header">
                  <el-input v-model="states.hasSearchValue" placeholder="名称">
                      <template #suffix>
                        <el-icon @click="searchUser('right')">
                            <Search />
                        </el-icon>
                      </template>
                  </el-input>
              </div>
          </template>
          <div>
              <el-tree ref="treeRightRef" :data="states.hasSelectionList" default-expand-all  show-checkbox :props="states.treeProps"
                  node-key="id" :expand-on-click-node="false" :filter-node-method="filterNode"
                  @check="selectedList('right')"
                >
                  <template #default="{ node }">
                      <div class="custom-node">
                          <span>{{ node.label }}</span>
                      </div>
                  </template>
              </el-tree>
          </div>
      </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, reactive, nextTick, defineComponent } from 'vue'
import { Search, Delete, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
//叉号图标
import { formatTree } from './arrayTotree'

//左侧树的标识
const treeLeftRef = ref(null)
//右侧树的标识
const treeRightRef = ref(null)

const states = reactive({
  // 树配置
  treeProps: {
      label: 'name',
      children: 'children',
  },
  // 全部搜索 左侧搜索
  allSearchValue: undefined,
  // 已选搜索 右侧搜索
  hasSearchValue: undefined,
  // 已经勾选的数据，包括父节点和子节点 用于显示右侧树
  hasSelectionList: [],
  // 左边树已经勾选的数据，只保存子节点 用于控制向右箭头的禁用状态
  hasSelectionSonLeftList: [],
  // 右边树已经勾选的数据，只保存子节点 用于控制向左箭头的禁用状态
  hasSelectionSonRightList: [],
  // 不同分支树的节点-暂时还没有用到
  treeIds: [],
  // 左侧树的数据 
  treeData: [],
  // 默认勾选数据
  defaultChecked: [],
})


//初始化左侧树
const initTree = (data) => {
  // 数据转换，转换成树形数据
  states.treeData = formatTree(data)

  // 默认勾选值
  states.defaultChecked = ['1-2']
  nextTick(() => {
    selectedList('left')
    // 处理勾选
    handleCheckChange()
  })
}
// 树勾选处理，获取所有勾选的子集
const handleCheckChange = () => {
  //获取选中的节点，包括父节点、子节点、半选中节点
  let data = treeLeftRef.value.getCheckedNodes(false, true)
  //为了防止数据里包含子节点数据，这里只取一级数据
  let data2 = data.map(e => {
      return {
          id: e.id,
          name: e.name,
          parentId: e.parentId,
      }
  })
  //将组装的数据转成树形数据，再右侧显示
  states.hasSelectionList = formatTree(data2)
//   states.rightCount = treeRightRef.value.getCheckedNodes(true, false).length;
  //  console.log(states.hasSelectionList)
}

// 取消勾选
const handleCancelCheck = () => {
    console.log('states.hasSelectionSonRightList', states.hasSelectionSonRightList)
    states.hasSelectionSonRightList.forEach(data => {
        treeLeftRef.value.setChecked(data, false, false)
    })
  //重新更新右侧树
  handleCheckChange()
}
//获取勾选的子集数据
const selectedList = (type: string) => {
    if (type === 'left') {
        // 获取勾选的子集数据，不包括父级
        states.hasSelectionSonLeftList = treeLeftRef.value.getCheckedNodes(true)
    } else {
        states.hasSelectionSonRightList = treeRightRef.value.getCheckedNodes(true)
    }
}
// 查询用户
const searchUser = (type: string) => {
  if (type == 'left') {
      // 左侧树查询
      treeLeftRef.value!.filter(states.allSearchValue)
  } else {
      // 右侧树查询
      treeRightRef.value!.filter(states.hasSearchValue)
  }
}

//树节点过滤
const filterNode = (value: string, data: any) => {
    console.log('444', value, data)
  if (!value) return true
  return data.name.includes(value)
}

//清除数据
const clearData = () => {
  states.hasSelectionList = []
  states.hasSelectionSonLeftList = []
  states.hasSelectionSonRightList = []
  states.allSearchValue = undefined
  states.hasSearchValue = undefined
  states.treeIds = []
  states.treeData = []
  states.defaultChecked = []
}

//向外暴露属性和方法
defineExpose({
  initTree,
  clearData,
})
const COMPONENT_NAME = 'SzywTreeTransfer'
defineOptions({
  name: COMPONENT_NAME
})
</script>

<style lang="scss" scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
.card-list {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;

  .box-card {
      width: 35%;
      height: 500px;

      .header-title {
          padding-bottom: 10px;
      }

      .custom-node {
          display: flex;
          justify-content: space-between;
          width: 100%;
      }
  }
}

.icon-size {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
</style>
