<template>
  <div class="confirm">
    <router-link to="/">ホーム</router-link>
    <h1>confirm</h1>
    <p>状態: {{stateText}}</p>
    <h2>vuexデータ</h2>
    <div v-if="confirmData">名前{{confirmData.name}}</div>
    <div v-if="confirmData">性別{{confirmData.gender}}</div>
    <div v-if="confirmData">コメント{{confirmData.comment}}</div>

    <button type="button" @click="goBack()">戻る</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      confirmData: null,
    }
  },
  computed: {
    ...mapGetters('form', [
      'isPermissioned',
      'formData',
    ]),
    stateText() {
      return this.isPermissioned ? '正常' : '異常'
    },
  },
  created() {
    this.confirmData = Object.freeze(this.formData)
    this.setFormData(null)
  },
  destroyed() {
    console.log('confirm destroy')
    this.setPermission(false)
  },
  methods: {
    ...mapActions('form', [
      'setPermission',
      'setFormData',
    ]),

    goBack() {
      this.setFormData(this.confirmData)
      this.$router.push({ path: '/form' })
    }
  },
}
</script>