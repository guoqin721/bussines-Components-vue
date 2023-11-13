
    /**
     * @description: 把数据处理成树状结构
     * @param {Array}  Array 原始数据
     * @param {Object} 属性
     *                  object.baseId 默认:-1 根节点id
     *                  object.pidName 默认:'parentId' 父级标识 字段名称
     *                  object.childName 默认:'children' 子集 保存 字段名称
     *                  object.format 默认: undefined 返回数据字段，如果为空则返回全部数据 例如： {id: 'id', label: 'name'}
     * @return: 树形结构 数据
     */
    export function formatTree(data, property = {}) {
      let datTree = []
      let dat = data.slice(0)
      let baseId = property.baseId ||'-1'
      let pidName = property.pidName || 'parentId'
      let childName = property.childName || 'children'
      let format = property.format

      baseNodes(dat, datTree)
      // 处理根节点
      function baseNodes(d, datTree) {
          let index = 1
          for (let i = 0; i < d.length; i++) {
              if (`${d[i][pidName]  }` == `${baseId  }`) {
                  d[i][childName] = []
                  d[i].tableIndex = index++
                  if (format == undefined) {
                      datTree.push(d[i])
                  } else {
                      let formatData = {}
                      for (const key in format) {
                          if (d[i] != undefined) {
                              formatData[key] = d[i][format[key]]
                          }
                      }
                      formatData.id = d[i].id
                      formatData[childName] = []
                      datTree.push(formatData)
                  }
                  d.splice(i, 1)
                  --i
              }
          }
          if (d.length > 0) {
              childNodes(d, datTree)
          }
      }
      // 处理非根节点
      function childNodes(d, datTree) {
          for (let i = 0; i < datTree.length; i++) {
              let index = 1
              for (let j = 0; j < d.length; j++) {
                  if (`${datTree[i].id  }` == `${d[j][pidName]  }`) {
                      d[j][childName] = []
                      d[j].tableIndex = `${datTree[i].tableIndex  }.${  index++}`
                      if (format == undefined) {
                          datTree[i][childName].push(d[j])
                      } else {
                          let formatData = {}
                          for (const key in format) {
                              if (d[j] != undefined) {
                                  formatData[key] = d[j][format[key]]
                              }
                          }
                          formatData.id = d[j].id
                          formatData[childName] = []
                          datTree[i][childName].push(formatData)
                      }
                      d.splice(j, 1)
                      --j
                  }
              }
              if (d.length > 0) {
                  childNodes(d, datTree[i][childName])
              }
          }
      }
      return datTree
  }

