export default {
  components: {
  },
  data () {
    return {
    }
  },
  filters: {
    // 日期格式化
    formatTime (time, yearKey = '.', monthKey = '.', dayKey = '',
      hasHour, hasMinute) {
      let date = new Date(time * 1000)
      let y = 1900 + date.getYear()
      let m = '0' + (date.getMonth() + 1)
      let d = '0' + date.getDate()
      let hour = '0' + date.getHours()
      let minute = '0' + date.getMinutes()
      let resultTime = y + yearKey + m.substring(m.length - 2, m.length) + monthKey + d.substring(d.length - 2, d.length) + dayKey
      if (hasHour && !hasMinute) {
        return resultTime + ' ' + hour.substring(hour.length - 2, hour.length)
      } else if (hasHour && hasMinute) {
        return resultTime + ' ' + hour.substring(hour.length - 2, hour.length) + ':' + minute.substring(minute.length - 2, minute.length)
      }
      return resultTime
    }
  },
  methods: {
    go (path) {
      this.$router.push(path)
    },
    goBack () {
      this.$router.go(-1)
    },
    // 表单验证
    validate (arr) {
      let err = {}
      arr.some((item) => {
        // 数字转换字符串
        if (typeof (item.key) === 'number') {
          item.key = item.key.toString()
        }
        // 验证非空
        if (!item.key || item.key.match(/^[ ]+$/)) {
          err[item.type] = true
          return err.msg = '请填写' + item.name
        }
        // 验证姓名
        if (item.type === 'name' && (!/^[\u4e00-\u9fa5]+$/.test(item.key) || item.key.length < 2)) {
          err[item.type] = true
          return err.msg = '请输入正确的' + item.name
        }
        // 验证手机号
        if (item.type === 'phone' && !(item.key.length === 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/.test(item.key))) {
          err[item.type] = true
          return err.msg = '请输入正确的' + item.name
        }
        // 验证身份证号
        if (item.type === 'idCard' && !/^\d{6}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(item.key)) {
          err[item.type] = true
          return err.msg = '请输入正确的' + item.name
        }
        // 验证金额
        if (item.type === 'price' && ((!Number.isFinite(Number(item.key)) || Number(item.key) <= 0) || (item.key.split('.')[1] && item.key.split('.')[1].length > 2))) {
          err = '请输入正确的' + item.name
        }
      })
      return Object.keys(err).length ? err : ''
    },
    // 获取url参数
    getQueryString (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let r = window.location.search.substr(1).match(reg)
      if (r !== null) return unescape(r[2])
      return null
    },
    resetImgUrl (val) {
      if (this.maxErrorNum > 0) {
        --this.maxErrorNum
        val.οnerrοr = () => {
          this.resetImgUrl(val)
        }
        setTimeout(() => {
          // eslint-disable-next-line
          val.srcElement.src = val.srcElement.src
        }, 200)
      } else {
        val.οnerrοr = null
        val.srcElement.src = require('@/assets/default-avatar.png')
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    transitionName () {
      return this.$store.state.transitionName
    },
    checkTab () {
      return this.$store.state.checkTab
    }
  },
  watch: {
  },
  mounted () {
  },
  beforeDestory () {
  }
}
