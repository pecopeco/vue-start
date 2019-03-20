export default {
  components: {
  },
  data () {
    return {
    }
  },
  filters: {
  },
  methods: {
    go (path) {
      this.$router.push(path)
    },
    goBack () {
      this.$router.go(-1)
    },
    // 非空验证
    validate (key) {
      if (typeof (key) === 'number') {
        key = key.toString()
      }
      return !key || key.match(/^[ ]+$/)
    },
    // 手机号验证
    isPhone (key) {
      return !(key.length === 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(key))
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  watch: {
  },
  mounted () {
  },
  beforeDestory () {
  }
}
