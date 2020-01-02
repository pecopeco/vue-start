<template lang="pug">
  .about
    nav-bar(title="about")
    .title about
    van-field(
      v-model="name"
      label="姓名"
      placeholder="请输入就诊人姓名"
      clearable
    )
    van-field(
      v-model="phone"
      label="手机号"
      placeholder="请输入手机号"
      clearable
    )
    van-button(
      type="primary"
      @click="submit"
    ) 提交
    .back(@click="goBack()") back
    .my(@click="go('./my')") go my
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      name: '',
      phone: ''
    }
  },
  methods: {
    async submit () {
      let err = this.validate([
        {
          key: this.name,
          type: 'name',
          name: '姓名'
        },
        {
          key: this.phone,
          type: 'phone',
          name: '手机号'
        }
      ])
      if (err) {
        return this.$toast(err)
      }
      this.loading = true
      const res = await this.$http.post('/xxx', {
        name: this.name,
        phone: this.phone
      })
      this.loading = false
      if (res) {
        this.$toast('提交成功')
      }
    }
  },
  mounted () {
  },
  destroyed () {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style scoped lang="stylus">

.about {
}
</style>
