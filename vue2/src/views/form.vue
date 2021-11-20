<template>
  <div class="form">
    <h1>form</h1>
    <dl>
      <div class="form__inline">
        <dt>お名前</dt>
        <dd><input v-model="name" type="text"></dd>
      </div>
      <div class="form__inline">
        <dt>性別</dt>
        <dd>
          <label>
            <input v-model="gender" type="radio" name="gender" value="man">
            男
          </label>
          <label>
            <input v-model="gender" type="radio" name="gender" value="woman">
            女
          </label>
          <label>
            <input v-model="gender" type="radio" name="gender" value="other">
            回答しない
          </label>
        </dd>
      </div>
      <div class="form__inline">
        <dt>コメント</dt>
        <dd><textarea v-model="comment" type="text" /></dd>
      </div>
    </dl>
    <button type="button" @click="submit">送信</button>

    <h2>vuexデータ</h2>
    <div v-if="formData">名前{{formData.name}}</div>
    <div v-if="formData">性別{{formData.gender}}</div>
    <div v-if="formData">コメント{{formData.comment}}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      name: '',
      gender: '',
      comment: '',
    }
  },
  computed: {
    ...mapGetters('form', [
      'formData'
    ]),
  },
  created() {
    console.log('form created')
    this.name = this.formData?.name ?? ''
    this.gender = this.formData?.gender ?? ''
    this.comment = this.formData?.comment ?? ''
    this.setPermission(false)
    this.setFormData(null)
  },
  methods: {
    ...mapActions('form', [
      'setPermission',
      'setFormData',
    ]),
    submit() {
      this.setPermission(true)
      this.setFormData({
        name: this.name,
        gender: this.gender,
        comment: this.comment,
      })
      this.$router.push({ path: '/confirm' })
    }
  }
}
</script>

<style scoped>
.form {
  width: 800px;
  margin: 0 auto;
}
.form__inline {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
</style>