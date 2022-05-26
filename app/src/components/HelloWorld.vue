<template>
  <!-- 2の方を使う（これは破棄予定） -->
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
        :items="items"
        :open-all="true"
      >
        <template #label="{ item }">
          <div class="d-flex align-center">
            <v-checkbox v-model="item.isChecked" class="ml-2" />
            <v-text-field v-if="isEditing" v-model="item.name" />
            <div v-else @click="addRowNext(item)">{{ item.name }}: {{ item.id }}</div>
          </div>
        </template>
        <template #append="{ item }">
          <div style="display: flex; align-items: center;">
            <div :style="`width: ${widthList.price1}px;`" class="px-3">{{ item.price1 }}</div>
            <div :style="`width: ${widthList.price2}px;`" class="px-3">{{ item.price2 }}</div>
            <div :style="`width: ${widthList.price3}px;`" class="px-3">{{ item.price3 }}</div>
            <div :style="`width: ${widthList.note}px;`" class="px-3">{{ item.note }}</div>
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
          </div>
        </template>
      </v-treeview>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import _ from 'lodash'

let idCounter = 12

export default {
  name: 'HelloWorld',

  data: () => ({
    items,
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

  methods: {
    /** 行結合 */
    joinRows() {
      const clone = _.cloneDeep(this.items)

      let result = this.getChackedParent(null, clone);
      while(result !== null) {
        const { parent } = result
        // TODO: getChekedIdList(children)作成
        const checkedIdList = []

        let children = []
        if (parent) {
          children = parent.children
        } else {
          children = clone
        }

        for (const item of children) {
          if (item.isChecked) {
            item.isChecked = false
            checkedIdList.push(item.id)
          }
        }

        if (checkedIdList.length > 1) {
          const newRow = _.cloneDeep(emptyItem);
          newRow.id = `${idCounter++}`
          for (const id of checkedIdList) {
            const targetIndex = children.findIndex(item => item.id === id)

            newRow.price1 += children[targetIndex].price1
            newRow.price2 += children[targetIndex].price2
            newRow.price3 += children[targetIndex].price3

            // 配列削除
            children.splice(targetIndex, 1)
            // フラグの場合こちら
            // children[targetIndex].delete = '1'
          }
          children.push(newRow)
        } else {
          // NOTE: チェックだけ外して何もしない
        }

        result = this.getChackedParent(null, clone);
      }
      this.items = clone
    },

    /** 削除ボタン */
    deleteRow(rowData) {
      const clone = _.cloneDeep(this.items)
      // 親階層の取得
      const result = this.getTargetParent(null, clone, rowData)

      if (result) {
        const { parent, childIndex } = result
        if (parent) {
          parent.children.splice(childIndex, 1)
        } else {
          clone.splice(childIndex, 1)
        }
      }
      this.items = clone
    },

    /** チェック行削除 */
    deleteCheckedRows() {
      const clone = _.cloneDeep(this.items)

      let result = this.getChackedParent(null, clone);
      while(result !== null) {
        const { parent, index } = result

        let children = []
        if (parent) {
          children = parent.children
        } else {
          children = clone
        }

        children.splice(index, 1)
        // フラグの場合こちら
        // children[targetIndex].delete = '1'

        result = this.getChackedParent(null, clone);
      }

      this.items = clone
    },

    /** 行追加 */
    addRowNext(rowData) {
      const clone = _.cloneDeep(this.items)
      // 親階層の取得
      const result = this.getTargetParent(null, clone, rowData)

      if (result) {
        const { parent, childIndex } = result
        const cloneEmptyItem = _.cloneDeep(emptyItem)
        cloneEmptyItem.id = `${idCounter++}`

        if (parent) {
          parent.children.splice(childIndex + 1, 0, cloneEmptyItem)
        } else {
          clone.splice(childIndex + 1, 0, cloneEmptyItem)
        }
      }
      this.items = clone
    },

    /** 行移動 */
    onClickUpDown(rowData, directive) {
      const clone = _.cloneDeep(this.items)
      // 親階層の取得
      const result = this.getTargetParent(null, clone, rowData)

      if (result) {
        const { parent, childIndex } = result
        if (parent) {
          // 『最初の要素が上に移動する場合』と『最後の要素が下に移動する場合』は処理しない
          if (
            (directive === 1 && childIndex === parent?.children?.length - 1) ||
            (directive === -1 && childIndex === 0)
          ) {
            return
          }

          const addData = parent.children.splice(childIndex, 1)
          parent.children.splice(childIndex + directive, 0, addData[0])
        } else {
          // 『最初の要素が上に移動する場合』と『最後の要素が下に移動する場合』は処理しない
          if (
            (directive === 1 && childIndex === clone.length - 1) ||
            (directive === -1 && childIndex === 0)
          ) {
            return
          }

          const addData = clone.splice(childIndex, 1)
          clone.splice(childIndex + directive, 0, addData[0])
        }
      }

      this.items = clone
    },

    // 対象行の親階層とインデックス番号を取得
    getTargetParent(parent, children, rowData) {
      let result = null
      for (const [index, item] of children.entries()) {
        if (rowData.id === item.id) {
          result = { parent, childIndex: index }
          break
        } else if (item.children?.length > 0) {
          result = this.getTargetParent(item, item.children, rowData)
        }
      }
      return result
    },
  },
}

const items = [
  { id: '1', isChecked: false, name: '0', price1: 30000, price2: 40000, price3: 50000, note: 'あああああああああああああああああああ', delete: '0', children: [
    { id: '2', isChecked: false, name: '0-0', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
    { id: '3', isChecked: false, name: '0-1', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああ', delete: '0', children: [
      { id: '4', isChecked: false, name: '0-1-0', price1: 30000, price2: 40000, price3: 50000, note: 'あああ', delete: '0', children: []},
      { id: '5', isChecked: false, name: '0-1-1', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああ', delete: '0', children: [] },
      { id: '6', isChecked: false, name: '0-1-2', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
      { id: '7', isChecked: false, name: '0-1-3', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああ', delete: '0', children: [] },
    ]},
    { id: '8', isChecked: false, name: '0-2', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
    { id: '9', isChecked: false, name: '0-3', price1: 30000, price2: 40000, price3: 50000, note: 'ああああああああああああああああああああ', delete: '0', children: [] },
  ]},
  { id: '10', isChecked: false, name: '1', price1: 30000, price2: 40000, price3: 50000,  note: 'ああああああああああああああああああああああ', delete: '0', children: [] },
  { id: '11', isChecked: false, name: '2', price1: 30000, price2: 40000, price3: 50000,  note: 'ああああああああああああああああああああああああああ', delete: '0', children: [] },
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