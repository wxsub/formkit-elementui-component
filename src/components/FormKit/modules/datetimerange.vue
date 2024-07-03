<!-- eslint-disable vue/attributes-order -->
<template>
  <div class="DatetimeRange">
    <el-date-picker
      v-model="_value"
      :picker-options="$attrs['pickerOptions'] || pickerOptions"
      value-format="yyyy-MM-dd"
      type="daterange"
      unlink-panels
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      clearable
      size="small"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  name: 'DatetimeRange',
  model: { prop: 'value', event: 'change' },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { required: true, default: () => [] }
  },
  data() {
    return {
      timeScopes: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '今日',
            onClick(picker) {
              const today = new Date()
              picker.$emit('pick', [today, today])
            }
          },
          {
            text: '昨日',
            onClick(picker) {
              const yesterday = new Date()
              yesterday.setTime(yesterday.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [yesterday, yesterday])
            }
          },
          {
            text: '最近7天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近90天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本月',
            onClick(picker) {
              const end = new Date()
              let start = new Date()
              const year = start.getFullYear()
              const month = start.getMonth()
              start = new Date(year, month, 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '上月',
            onClick(picker) {
              const today = new Date()
              let year = today.getFullYear()
              let month = today.getMonth()
              const preMonthFinaly = new Date(year, month, 0)
              if (month === 0) {
                year--
                month = 11
              } else {
                month--
              }
              const preMonthFirst = new Date(year, month, 1)
              picker.$emit('pick', [preMonthFirst, preMonthFinaly])
            }
          },
          {
            text: '本季度',
            onClick(picker) {
              const today = new Date()
              const year = today.getFullYear()
              let month = today.getMonth()
              if (month >= 0 && month <= 2) {
                month = 0
              } else if (month >= 3 && month <= 5) {
                month = 3
              } else if (month >= 6 && month <= 8) {
                month = 6
              } else {
                month = 9
              }
              const quarterFirst = new Date(year, month, 1)
              picker.$emit('pick', [quarterFirst, today])
            }
          }
        ]
      }
    }
  },
  computed: {
    _value: {
      get() { return this.value || [] },
      set(newVal) { this.$emit('change', newVal || []) }
    }
  },
  created() {},
  methods: {
    setDefaultDate() {
      const date = new Date()
      const year = date.getFullYear().toString()
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
      const da = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()
      const end = year + '-' + month + '-' + da
      const beg = year + '-' + month + '-01'
      this._value = [beg, end]
    }
  }
}
</script>

<style lang="less" scoped>
.DatetimeRange ::v-deep .el-input__icon { line-height: 24px }
.el-picker-panel__sidebar .el-picker-panel__shortcut { margin: 8px 0 }
::v-deep .el-date-editor .el-range-separator { line-height: 22px !important }
</style>
