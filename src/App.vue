<template>
  <div class="wei-app">
    <h1>wei-design</h1>
    <hr>
      <div>
        <SzywProjectList />
        <SzywNodeSteps />
        <SzywTreeTransfer ref="treeTransfer"/>
      </div>
    </div>
</template>
<script setup lang="ts">
import {ref, shallowRef, onMounted} from 'vue'
const treeTransfer = shallowRef<InstanceType<typeof TreeTransfer>>()
// 查询树的数据
let data = [
    {
        id: '1',
        name: '公共角色',
        parentId: '-1',
    },
    {
        id: '1-1',
        name: '销售员',
        parentId: '1',
    },
    {
        id: '1-2',
        name: '采购员',
        parentId: '1',
    },
    {
        id: '2',
        name: '生产部',
        parentId: '-1',
    },
    {
        id: '2-1',
        name: '演示员',
        parentId: '2',
    },
    {
        id: '2-2',
        name: '机加工',
        parentId: '2',
    },
    {
        id: '2-2-1',
        name: '演示员2',
        parentId: '2-2',
    },
]
onMounted(() => {
    treeTransfer.value.initTree(data)
})
</script>
