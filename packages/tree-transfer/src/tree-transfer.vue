<template>
  <div class="steps-wrap">
    <el-steps :active="2" align-center>
      <el-step title="Step 1" description="Some description" />
      <el-step title="Step 2" description="Some description" />
      <el-step title="Step 3" description="Some description" />
      <el-step title="Step 4" description="Some description" />
    </el-steps>
  </div>
</template>
<script lang="ts" setup>
import {onMounted} from 'vue'
import { getTestData } from '../../http/test'
import '../../../src/assets/index.css'
import './index.scss'
const COMPONENT_NAME = 'SzywTreeTransfer'
defineOptions({
  name: COMPONENT_NAME
})
onMounted(async () => {
  const test = await getTestData()
  console.log('first', test)
})
</script>
<style scoped>
:deep(.is-finish){
  color: #06a71d!important;
}
.steps-wrap {
  font-size: 4px;
}
</style>
