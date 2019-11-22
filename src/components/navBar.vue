<template lang="pug">
  van-nav-bar(:title="title" left-arrow :left-text="leftText" @click-left="goBack")
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    leftText: {
      type: String,
      default: '返回'
    }
  },
  model: {
    prop: 'visible'
  },
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped lang="stylus"></style>
