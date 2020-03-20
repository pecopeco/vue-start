<template lang="pug">
  .about
    van-field(
      v-model="name"
      label="姓名"
      placeholder="请输入就诊人姓名"
      :error="err.name"
      clearable
    )
    van-field(
      v-model="phone"
      label="手机号"
      placeholder="请输入手机号"
      :error="err.phone"
      clearable
    )
    van-button.btn(type="primary" @click="submit") 提交
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      name: '',
      phone: '',
      err: ''
    }
  },
  methods: {
    async submit () {
      this.err = this.validate([
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
      if (this.err) {
        return this.$toast(this.err.msg)
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
  .btn {
    margin-top .2rem
  }
}
</style>
