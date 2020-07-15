<template lang="pug">
  .my
    .name {{"username:" + userInfo.name}}
</template>

<script>

export default {
  name: 'my',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped lang="stylus">

.my {
  .name {
    padding .2rem
  }
}
</style>
