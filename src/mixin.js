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
    },
    // 格式化参数，使用formData传输数据
    formatFormData (form) {
      let formData = new FormData()
      for (let key in form) {
        formData.append(key, form[key])
      }
      return formData
    },
    // 状态码处理
    checkStatus (err) {
      const codeMessage = {
        200: '服务器成功返回请求的数据.',
        201: '新建或修改数据成功.',
        202: '一个请求已经进入后台排队（异步任务）.',
        204: '删除数据成功.',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作.',
        401: '用户没有权限（令牌、用户名、密码错误）.',
        403: '用户得到授权，但是访问是被禁止的.',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作.',
        406: '请求的格式不可得',
        410: '请求的资源被永久删除，且不会再得到的.',
        422: '当创建一个对象时，发生一个验证错误.',
        500: '服务器发生错误，请检查服务器.',
        502: '网关错误',
        503: '服务不可用，服务器暂时过载或维护.',
        504: '网关超时'
      }
      if (err.status >= 300) {
        const errortext = codeMessage[err.status] || err.response.statusText
        this.Toast(errortext)
      }
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
