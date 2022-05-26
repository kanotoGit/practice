<template>
  <div style="overflow: auto;">
    <div @click="isEditing = !isEditing">編集モード</div>
    <div @click="joinRows()">結合</div>
    <div @click="deleteCheckedRows()">チェックした項目を削除</div>
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
        :items="items"
        :open-all="true"
        dense
      >
        <template #label="{ item }">
          <div class="d-flex align-center">
            <v-checkbox v-model="item.isChecked" class="ml-2" @change="onCheck($event, item)" />
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
              delete: {{ item.delete }}<br>
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
              <div class="d-flex align-items-center" title="1つ下に移動">
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
    this.showTable = false
    this.setTableData(true, true)
    this.showTable = true
  },

  methods: {
    /** チェックイベント */
    onCheck(isChecked, rowData) {
      const clone = _.cloneDeep(this.items)
      const { targetRowData } = this.getParentFromIndexRoute(clone, rowData.indexRoute)

      // 親要素の変更
      let parent = this.getRowDataFromId(clone, rowData.parentId)
      while(parent !== null) {
        const hasNotChecked = parent.children.some(item => !item.isChecked)
        if (hasNotChecked) {
          // 1つ以上チェックがついていない場合
          parent.isChecked = false
        } else {
          // すべてチェックがついている場合
          parent.isChecked = true
        }
        parent = this.getRowDataFromId(clone, parent.parentId)
      }

      // 子要素の変更
      this.scanTree(targetRowData, targetRowData.children, (parent, index) => {
        parent.children[index].isChecked = isChecked
      })

      this.items = clone
    },

    /** 行結合 */
    // TODO: 行が変更されたときもチェックイベントと同様の処理が必要
    joinRows() {

    },

    /** 行追加 */
    // TODO: 行が追加されたときもチェックイベントと同様の処理が必要
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
    },

    /** 子行追加 */
    // TODO: 行が追加されたときもチェックイベントと同様の処理が必要
    addChildRow(rowData) {
      const clone = _.cloneDeep(this.items)
      const { targetRowData } = this.getParentFromIndexRoute(clone, rowData.indexRoute)
      const cloneEmptyItem = _.cloneDeep(emptyItem)
      cloneEmptyItem.id = `${idCounter++}`

      // 追加処理
      targetRowData.children.push(cloneEmptyItem)

      this.items = clone

      this.setTableData()
    },

    /** 削除ボタン */
    // TODO: 行が削除されたときもチェックイベントと同様の処理が必要
    deleteRow(rowData) {
      const clone = _.cloneDeep(this.items)
      const { parentData } = this.getParentFromIndexRoute(clone, rowData.indexRoute)

      // 削除処理
      if (parentData) {
        parentData.children.splice(rowData.indexRoute.at(-1), 1)
      } else {
        clone.splice(rowData.indexRoute[0], 1)
        // TODO: フラグの場合の処理
      }
      this.items = clone

      this.setTableData()
    },

    /** チェック行削除 */
    // TODO: 行が削除されたときもチェックイベントと同様の処理が必要
    deleteCheckedRows() {
      const clone = _.cloneDeep(this.items)

      let result = this.getChackedParent(null, clone);
      while(result !== null) {
        const { parent, childIndex } = result

        let children = []
        if (parent) {
          children = parent.children
        } else {
          children = clone
        }

        children.splice(childIndex, 1)
        // フラグの場合こちら
        // children[childIndex].delete = '1'
        // children[childIndex].isChecked = false

        result = this.getChackedParent(null, clone);
      }

      this.items = clone
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
    // TODO: 金額の計算
    setTableData(isResetId, isResetCheck) {
      this.scanTree(null, this.items, (parent, index) => {
        if (parent === null) {
          // ルートの場合
          if (isResetId) {
            this.items[index]['id'] = `${idCounter++}`
          }
          if (isResetCheck) {
            this.items[index]['isChecked'] = false
          }
          this.items[index]['indexRoute'] = [index]
          this.items[index]['parentId'] = null
        } else {
          if (isResetId) {
            parent.children[index]['id'] = `${idCounter++}`
          }
          if (isResetCheck) {
            parent.children[index]['isChecked'] = false
          }
          parent.children[index]['indexRoute'] = [...parent.indexRoute, index]
          parent.children[index]['parentId'] = parent.id
        }
      })
    },

    /** テーブルデータを走査 */
    /** NOTE: ツリーを掘り下げる場合に使う */
    /** コールバック微妙かも */
    scanTree(parent, children, callback) {
      for (const [index, item] of children.entries()) {
        const isEnd = callback(parent, index)
        if (isEnd) {
          break
        }
        if (item.children.length > 0) {
          // (矢印が付いているやつら)
          this.scanTree(item, item.children, callback)
        } else {
          // 末端(矢印が付いていないやつら)
          // TODO: チェックボックスの初期化の件
          // 末端IDリストを作成して末端リストのデータからparentIDを使って遡って見れば良さそう
          console.log('末端：', item);
        }
      }
    },

    /** 指定IDから、その行の親階層を取得 */
    getParentFromId(parent, children, id) {
      for (const [index, item] of children.entries()) {
        if (item.id === id) {
          return { parent, childIndex: index }
        }
        if (item.children.length > 0) {
          return this.getParentFromId(item, item.children, id)
        }
      }
      return null
    },

    /** 指定IDから行データを取得 */
    // (これだけで良い気がしてきた)
    getRowDataFromId(children, id) {
      for (const item of children) {
        if (item.id === id) {
          return item
        }
        if (item.children.length > 0) {
          return this.getRowDataFromId(item.children, id)
        }
      }
      return null
    },

    /** インデックスルートから対象の行の親を取得(ルートであればnull) */
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

    // チェックされている行データの親階層とインデックス番号を取得
    getChackedParent(parent, children) {
      let result = null
      for (const [index, item] of children.entries()) {
        if (item.isChecked) {
          result = { parent, childIndex: index }
          break
        } else if (item.children?.length > 0) {
          result = this.getChackedParent(item, item.children)
        }
      }
      return result
    },
  },
}

const items = [
  { name: '0', price1: 30000, price2: 40000, price3: 50000, note: 'あああああああああああああああああああ', delete: '0', children: [
    { name: '0-0', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
    { name: '0-1', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああ', delete: '0', children: [
      { name: '0-1-0', price1: 30000, price2: 40000, price3: 50000, note: 'あああ', delete: '0', children: []},
      { name: '0-1-1', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああ', delete: '0', children: [
        { name: '0-1-1-0', price1: 30000, price2: 40000, price3: 50000,  note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
      ] },
      { name: '0-1-2', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
      { name: '0-1-3', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああ', delete: '0', children: [] },
    ]},
    { name: '0-2', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
    { name: '0-3', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああ', delete: '0', children: [] },
  ]},
  { name: '1', price1: 30000, price2: 40000, price3: 50000,  note: 'ああああああああああああああああああああああ', delete: '0', children: [] },
  { name: '2', price1: 30000, price2: 40000, price3: 50000,  note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
]

const emptyItem = { id: '', isChecked: false, name: 'new', price1: 0, price2: 0, price3: 0, level: 0 ,note: '', delete: '0', children: [] }
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