<template>
  <div style="overflow: auto;">
    <div @click="isEditing = !isEditing">編集モード</div>
    <div @click="joinRows()">結合</div>
    <div @click="deleteCheckedRows()">チェックした項目を削除</div>
    <div>{{selectedList}}</div>
    <div :style="`width: ${tebleWidth}px`" class="mt-5">
      <div style="display: flex; white-space: nowrap">
        <div :style="`width: ${widthList.name}px`" class="px-3">ラベル</div>
        <div :style="`width: ${widthList.price1}px`" class="px-3">金額１</div>
        <div :style="`width: ${widthList.price2}px`" class="px-3">金額２</div>
        <div :style="`width: ${widthList.price3}px`" class="px-3">金額３</div>
        <div :style="`width: ${widthList.note}px`" class="px-3">備考</div>
      </div>
      <v-treeview
        v-if="showTable"
        v-model="selectedList"
        :items="items"
        :open-all="true"
        selectable
      >
        <template #label="{ item }">
          <div class="d-flex align-center">
            <v-text-field v-if="isEditing" v-model="item.name" />
            <div v-else @click="addRowNext(item)">{{ item.name }}: {{ item.id }}</div>
          </div>
        </template>
        <template #append="{ item }">
          <div style="display: flex; align-items: center;">
            <div :style="`width: ${widthList.price1}px;`" class="px-3">{{ item.price1 }}</div>
            <div :style="`width: ${widthList.price2}px;`" class="px-3">{{ item.price2 }}</div>
            <div :style="`width: ${widthList.price3}px;`" class="px-3">{{ item.price3 }}</div>
            <div :style="`width: ${widthList.note}px;`" class="px-3">
              route: {{ item.indexRoute }}<br>
              parentId: {{ item.parentId }}<br>
            </div>
            <div :style="`width: ${widthList.up}px;`" class="px-3">
              <div class="d-flex align-items-center" title="1つ上に移動">
                <v-icon @click="onClickUpDown(item, -1)">mdi-arrow-up-circle</v-icon>
              </div>
            </div>
            <div :style="`width: ${widthList.down}px;`" class="px-3">
              <div class="d-flex align-items-center" title="1つ下に移動">
                <v-icon @click="onClickUpDown(item, 1)">mdi-arrow-down-circle</v-icon>
              </div>
            </div>
            <div :style="`width: ${widthList.delete}px;`" class="px-3">
              <div class="d-flex align-items-center" title="1つ下に移動">
                <v-icon @click="deleteRow(item)">mdi-delete</v-icon>
              </div>
            </div>
            <div :style="`width: ${widthList.delete}px;`" class="px-3">
              <div v-if="item.indexRoute.length < 4" class="d-flex align-items-center" title="1つ下に移動">
                <v-icon @click="addChildRow(item)">mdi-plus</v-icon>
              </div>
            </div>
          </div>
        </template>
      </v-treeview>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import _ from 'lodash'

let idCounter = 0

export default {
  name: 'HelloWorld',

  data: () => ({
    items,
    selectedList: [],
    endNodeIdList: [],
    showTable: false,
    isEditing: false,
    // NOTE: データが更新されるたびにwidthListも変更する
    widthList: {
      name: 240, // ラベル分の幅
      price1: 70,
      price2: 70,
      price3: 70,
      note: 240,
      up: 30,
      down: 30,
      delete: 30,
      child: 30,
    }
  }),

  computed: {
    tebleWidth() {
      let sum = 0;
      for (const item of Object.keys(this.widthList)) {
        sum += this.widthList[item]
      }
      return sum
    }
  },

  mounted() {
    // this.showTable = false
    this.setTableData(true)
    this.setPriceData()
    this.showTable = true
  },

  methods: {
    /** TODO: 行結合 */
    joinRows() {
      // チェックが付いている親階層もID追加
      this.addParentCheck()

      if (this.selectedList.length < 2) {
        // チェック数エラー
        this.selectedList = []
        return
      }

      const clone = _.cloneDeep(this.items)

      // すべての親階層を一式にまとめる処理
      // NOTE: 結合された子要素のチェックを外すためボトムアップで処理する
      this.scanTreeBottomUp(null, clone, (current, parent, index) => {
        if (this.selectedList.includes(current.id)) {
          // 一式にまとめる処理
          if (current.children.length > 0) {
            // 結合後のデータ
            const cloneEmptyItem = _.cloneDeep(emptyItem)
            cloneEmptyItem.id = `${idCounter++}`
            cloneEmptyItem.parentId = current.parentId

            // データの継承
            for (const item of current.children) {
              cloneEmptyItem.price1 += item.price1
              cloneEmptyItem.price2 += item.price2
              cloneEmptyItem.price3 += item.price3
              this.selectedList = this.selectedList.filter(
                filterItem => filterItem !== item.id
              )
            }

            // 選択状態の更新
            this.selectedList.push(cloneEmptyItem.id)
            this.selectedList = this.selectedList.filter(
              filterItem => filterItem !== current.id
            )

            if (parent) {
              parent.children.splice(index, 1, cloneEmptyItem)
            } else {
              clone.splice(index, 1, cloneEmptyItem)
            }
          }
        }
      })

      if (this.selectedList <= 1) {
        this.selectedList = []
      } else {
        const parentIdList = this.selectedList.map(item => {
          return this.getRowDataFromId(clone, item)?.parentId
        })
        const targetParentId = parentIdList[0]
        // 親IDが全て一致するかテスト
        const isEqualParentId = parentIdList.every(
          value => value === targetParentId
        );

        if (isEqualParentId) {
          // すべての兄弟階層を結合
          if (targetParentId !== null) {
            const targetParent = this.getRowDataFromId(clone, targetParentId)
            // 結合後のデータ
            const cloneEmptyItem = _.cloneDeep(emptyItem)
            cloneEmptyItem.id = `${idCounter++}`
            cloneEmptyItem.parentId = targetParent.id

            // データの継承＆削除
            for (const id of this.selectedList) {
              const index = targetParent.children.findIndex(item => item.id === id)
              cloneEmptyItem.price1 += targetParent.children[index].price1
              cloneEmptyItem.price2 += targetParent.children[index].price2
              cloneEmptyItem.price3 += targetParent.children[index].price3
              targetParent.children.splice(index, 1)
            }

            targetParent.children.unshift(cloneEmptyItem)
          } else {
            // 結合後のデータ
            const cloneEmptyItem = _.cloneDeep(emptyItem)
            cloneEmptyItem.id = `${idCounter++}`
            cloneEmptyItem.parentId = null

            // データの継承＆削除
            for (const id of this.selectedList) {
              const index = clone.findIndex(item => item.id === id)
              cloneEmptyItem.price1 += clone[index].price1
              cloneEmptyItem.price2 += clone[index].price2
              cloneEmptyItem.price3 += clone[index].price3
              clone.splice(index, 1)
            }

            clone.unshift(cloneEmptyItem)
          }

        } else {
          this.selectedList = []
          console.error('またがりエラー')
          return
        }
      }

      this.items = clone

      this.setTableData()
      this.setPriceData()

      this.selectedList = []
    },

    /** 行追加 */
    addRowNext(rowData) {
      const clone = _.cloneDeep(this.items)
      const { parentData } = this.getParentFromIndexRoute(clone, rowData.indexRoute)
      const cloneEmptyItem = _.cloneDeep(emptyItem)
      cloneEmptyItem.id = `${idCounter++}`

      // 追加処理
      if (parentData) {
        parentData.children.splice(rowData.indexRoute.at(-1) + 1, 0, cloneEmptyItem)
      } else {
        clone.splice(rowData.indexRoute.at(-1) + 1, 0, cloneEmptyItem)
      }
      this.items = clone

      this.setTableData()
      this.setPriceData()
    },

    /** 子行追加 */
    addChildRow(rowData) {
      const clone = _.cloneDeep(this.items)
      const { targetRowData } = this.getParentFromIndexRoute(clone, rowData.indexRoute)
      const cloneEmptyItem = _.cloneDeep(emptyItem)
      cloneEmptyItem.id = `${idCounter++}`

      // 追加処理
      if (rowData.children.length === 0) {
        // 子から子を作成する場合、データを継承する
        cloneEmptyItem.price1 = targetRowData.price1
        cloneEmptyItem.price2 = targetRowData.price2
        cloneEmptyItem.price3 = targetRowData.price3
      }
      targetRowData.children.push(cloneEmptyItem)


      this.items = clone

      this.setTableData()
      this.setPriceData()
    },

    /** 削除ボタン */
    deleteRow(rowData) {
      const clone = _.cloneDeep(this.items)
      const { parentData } = this.getParentFromIndexRoute(clone, rowData.indexRoute)

      // 削除処理
      if (parentData) {
        parentData.children.splice(rowData.indexRoute.at(-1), 1)
      } else {
        clone.splice(rowData.indexRoute[0], 1)
      }
      this.items = clone

      this.setTableData()
      this.setPriceData()
    },

    /** TODO: チェック行削除 */
    deleteCheckedRows() {
    },

    /** 行移動(done) */
    onClickUpDown(rowData, directive) {
      const clone = _.cloneDeep(this.items)
      const { parentData } = this.getParentFromIndexRoute(clone, rowData.indexRoute)

      const targetIndex = rowData.indexRoute.at(-1)
      const targetRowData = parentData?.children ?? clone

      if (directive === -1) {
        // 上に移動する場合
        if (targetIndex !== 0) {
          targetRowData.splice(
            targetIndex - 1,
            2,
            targetRowData[targetIndex],
            targetRowData[targetIndex - 1],
          )
        } else {
          // NOTE: 対象の行が最初のため処理しない
        }
      } else {
        // 下に移動する場合
        if (targetIndex !== targetRowData.length - 1) {
          targetRowData.splice(
            targetIndex,
            2,
            targetRowData[targetIndex + 1],
            targetRowData[targetIndex],
          )
        } else {
          // NOTE: 対象の行が最後のため処理しない
        }
      }

      this.items = clone

      this.setTableData()
    },

    /** テーブルデータのセット */
    setTableData(isResetId = false) {
      const clone = _.cloneDeep(this.items)
      this.endNodeIdList = []

      this.scanTreeTopDown(null, clone, (current, parent, index) => {
        if (isResetId) {
          current['id'] = `${idCounter++}`
        }
        if (parent === null) {
          // 第１階層
          current['indexRoute'] = [index]
          current['parentId'] = null
        } else {
          // 第２階層以下
          current['indexRoute'] = [...parent.indexRoute, index]
          current['parentId'] = parent.id
        }

        // 子要素を持たないノード
        if (current.children.length === 0) {
          this.endNodeIdList.unshift(_.cloneDeep(current))
        }
      })
      this.items = clone
    },

    /** 金額のセット */
    setPriceData() {
      const clone = _.cloneDeep(this.items)

      // NOTE: 金額の時は下層から計算する
      this.scanTreeBottomUp(null, clone, (current, parent, index) => {
        if (current.children.length > 0) {
          current.price1 = current.children.reduce((prevValue, currentValue) => {
            prevValue += currentValue.price1
            return prevValue
          }, 0)
          current.price2 = current.children.reduce((prevValue, currentValue) => {
            prevValue += currentValue.price2
            return prevValue
          }, 0)
          current.price3 = current.children.reduce((prevValue, currentValue) => {
            prevValue += currentValue.price3
            return prevValue
          }, 0)
        }
      })
      this.items = clone
    },

    /** テーブルデータを走査 */
    /** NOTE: ツリーを掘り下げる場合に使う */
    scanTreeTopDown(parent, children, callback) {
      for (const [index, item] of children.entries()) {
        callback(item, parent, index)
        if (item.children.length > 0) {
          // (矢印が付いているやつら)
          this.scanTreeTopDown(item, item.children, callback)
        }
      }
    },

    /** テーブルデータを走査 */
    /** NOTE: ツリーを遡る場合に使う */
    scanTreeBottomUp(parent, children, callback) {
      for (const [index, item] of children.entries()) {
        if (item.children.length > 0) {
          // (矢印が付いているやつら)
          this.scanTreeBottomUp(item, item.children, callback)
        }
        callback(item, parent, index)
      }
    },

    /** 子要素が全てチェックされている行をselectedListに追加 */
    addParentCheck() {
      const clone = _.cloneDeep(this.items)
      this.scanTreeBottomUp(null, clone, (current, parent, index) => {
        if (current.children.length > 0) {
          const isAllCheckChildren = current.children.every(
            item => this.selectedList.includes(item.id)
          )
          if (isAllCheckChildren) {
            this.selectedList.push(current.id)
          }
        }
      })
    },

    /** 指定IDから行データを取得 */
    // もう少しチェックしたい
    getRowDataFromId(children, id) {
      let result = null
      for (const item of children) {
        if (item.children.length > 0) {
          result = this.getRowDataFromId(item.children, id)
          if (result !== null) {
            return result
          }
        }
        if (item.id === id) {
          return item
        }
      }
      return null
    },

    /** インデックスルートから対象の行の親を取得(ルートであればnull) */
    // これなしの方が良いかも？
    getParentFromIndexRoute(tableData, indexRoute) {
      let targetRowData = tableData[indexRoute[0]]
      let parentData = null
      if (indexRoute.length > 1) {
        for (let i = 1; i < indexRoute.length; i++) {
          const index = indexRoute[i]
          parentData = targetRowData
          targetRowData = targetRowData.children[index]
        }
      }
      return { parentData, targetRowData }
    },
  },
}

const items = [
  { name: '0', price1: 30000, price2: 40000, price3: 50000, note: 'あああああああああああああああああああ', delete: '0', children: [
    { name: '0-0', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
    { name: '0-1', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああ', delete: '0', children: [
      { name: '0-1-0', price1: 30000, price2: 40000, price3: 50000, note: 'あああ', delete: '0', children: []},
      { name: '0-1-1', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああ', delete: '0', children: [] },
      { name: '0-1-2', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
    ]},
    { name: '0-2', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああああああ', delete: '0', children: [
      { name: '0-2-0', price1: 30000, price2: 40000, price3: 50000, note: 'あああ', delete: '0', children: []},
      { name: '0-2-1', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああ', delete: '0', children: [] },
    ] },
    { name: '0-3', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああ', delete: '0', children: [] },
  ]},
  { name: '1', price1: 30000, price2: 40000, price3: 50000,  note: 'ああああああああああああああああああああああ', delete: '0', children: [] },
  { name: '2', price1: 30000, price2: 40000, price3: 50000,  note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
]

const emptyItem = { name: 'new', price1: 0, price2: 0, price3: 0, level: 0 ,note: '', delete: '0', children: [] }
</script>

<style lang="scss" scoped>
::v-deep {
  .v-treeview-node__root {
    padding: 0;
  }
  .is-hide-label {
    .v-treeview-node__label {
      display: none;
    }
  }
}
</style>