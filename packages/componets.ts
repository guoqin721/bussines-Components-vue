import { SzywProjectList } from '../packages/project-list'
import { SzywNodeSteps } from '../packages/node-steps'
import { SzywTreeTransfer } from '../packages/tree-transfer'
// 用于批量引入的遍历
export default [SzywProjectList, SzywNodeSteps, SzywTreeTransfer]
export {
  SzywProjectList,
  SzywTreeTransfer,
  SzywNodeSteps
}