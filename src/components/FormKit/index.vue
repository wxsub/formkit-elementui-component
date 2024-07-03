<template>
  <div :class="[{ 'form-label-auto': isAutoAlignment }]" class="FormKit">
    <el-form
      :ref="UNIQUE_KEY"
      :model="FormData"
      :key="UNIQUE_KEY"
      v-bind="_FORM_ATTRS"
      :label-position="labelPosition"
      @keyup.enter.native="$emit('enter', FormData)">
      <el-row
        v-bind="row"
        :style="{ 'row-gap': `${rowGap}px` }"
        :class="[isAutoAlignment ? 'form-kit-auto' : 'form-kit-row']">
        <el-col
          v-for="(conf, index) in config.filter(ele => confController(ele))" :key="conf.key"
          v-bind="responseSize"
          :span="conf.span || COL_SPAN">
          <el-form-item
            :label="conf.label"
            :label-width="isAutoAlignment ? '0px' : (conf.labelWidth || `${labelWidth}px`)" :prop="conf.key"
            :rules="conf.rules">
            <component
              v-if="conf.type"
              :is="verificationLoad(conf.type)"
              :ref="`formKit-component-${conf.key}`"
              :key="conf.key"
              :disabled="conf['disabled'] || Notes[conf.key]"
              v-model="FormData[conf.key]"
              :options="Array.isArray(conf.options) && conf.options.length > 0 ? conf.options : (DataMaps[conf.key] || [])"
              v-bind="verificationProps(conf)" class="formKit-list-item"
              v-on="conf.events || {}"
              @change="mutation($event, conf, $refs[`formKit-component-${conf.key}`], index)" />
            <slot :name="conf.key" :row="conf" :value="FormData[conf.key]" :size="size" />
            <p v-if="conf.hint" class="item-hint" v-html="conf.hint" />
          </el-form-item>
        </el-col>
        <slot name="FormKitAppend" />
      </el-row>
    </el-form>
    <slot :config="config" name="FormKitContent" />
  </div>
</template>

<script>
import _ from 'lodash'
import recipient, { componentsList } from './asyncLoadModules'

export default {
  name: 'FormKit',
  model: { prop: 'value', event: 'change' },
  props: {
    value: { required: true, type: Object },
    config: { type: Array, default: () => [] },
    rules: { type: [Object, undefined] },
    disabled: { type: Boolean, default: false },
    labelPosition: { type: String, default: 'top' }, // 表单项对齐规则
    rowGap: { type: Number, default: 0 }, // 表单项纵向间距
    labelWidth: { type: [Number, String], default: 120 }, // 表单项标题宽度(仅在labelPosition为left、right时生效)
    columns: { type: [Number, String], default: 1 }, // 每行显示多少列
    size: { type: String, default: 'small' }, // 表单项尺寸
    row: { type: Object, default: () => ({ gutter: 30, type: 'flex' }) }, // 表单row项设置
    responseSize: { type: Object, default: () => ({}) } // 表单响应式布局尺寸
  },
  data: () => ({
    UNIQUE_KEY: Number(new Date()),
    DataMaps: {},
    Stack: [],
    Notes: {}
  }),
  computed: {
    _FORM_ATTRS() {
      return {
        size: this.size !== 'small' ? this.size : undefined,
        inline: this.columns !== 1,
        disabled: this.disabled,
        rules: this.rules && Object.keys(this.rules).length > 0 ? this.rules : undefined,
      }
    },
    FormData: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        // if (this.value && Object.keys(this.value).length === 0) this.UNIQUE_KEY = Number(new Date())
        return this.value || {}
      },
      set(newVal) {
        this.$emit('change', newVal)
      }
    },
    COL_SPAN() { return 24 / this.columns },
    isAutoAlignment() {
      return this.columns === 'auto' && this.labelPosition !== 'top'
    }
  },
  watch: {
    'config': {
      deep: false,
      immediate: true,
      handler: _.throttle(function() {
        this.Initialization()
      }, 3000, { leading: true, trailing: false })
    }
  },
  methods: {
    async Initialization() {
      const setConf = new Set(this.config)
      if (setConf.size > 0) {
        await this.init([...setConf])
      }
    },
    async init(configurations) {
      try {
        await Promise.all(configurations.map(async config => {
          const handlers = {
            common: this.commonHandler
          };
          for (const [handlerName, handlerFunction] of Object.entries(handlers)) {
            await handlerFunction.call(this, config)
          }
        }))
        await this.executeStack()
      } catch (error) {
        console.log(`[_initComponent method]: ${error}`)
      }
    },
    async commonHandler(config) {
      const { type } = config
      if (['select', 'radio', 'cascader', 'address', 'checkbox', 'tag', 'cascadeTag'].includes(type)) {
        await this.handleDataMaps(config)
      }
    },
    async handleDataMaps(config = {}) {
      if (config.type === 'address') {
        this.Stack.push(config)
      } else if (config.request === 'address') {
        this.Stack.push(config)
      } else if (_.isObject(config.request)) {
        this.Stack.push(config)
      }
    },
    confController(config) {
      if (config.visible === undefined) {
        return config
      } else {
        if (_.isObject(config.visible) || _.isArray(config.visible)) {
          this.fixedPointClearValidate(config)
          if (_.isObject(config.visible) && this.checkConfigIsVisible(config.visible)) return config
          if (_.isArray(config.visible)) {
            const _visible = config.visible
            const isCheck = _visible.some(it => { return this.checkConfigIsVisible(it) })
            if (isCheck) return config
          }
        } else if (_.isBoolean(config.visible)) {
          if (config.visible) return config
        } else {
          console.warn('visible field has been set, but it is not an [array, object, Boolean]!')
          return config
        }
      }
    },
    fixedPointClearValidate(config = {}) {
      if (
        Object.hasOwnProperty.call(config, 'key' && 'rules') &&
        this.$refs[this.UNIQUE_KEY]
      ) { this.$refs[this.UNIQUE_KEY]['clearValidate']([config.key]) }
    },
    verificationLoad(type) {
      const alias = { address: 'el-cascader' }
      if (_.includes(recipient, type)) {
        return componentsList[type] || `el-${type}`
      } else {
        if (alias[type]) return alias[type]
        return `el-${type}`
      }
    },
    clearValidate() {
      if (this.$refs[this.UNIQUE_KEY]) this.$refs[this.UNIQUE_KEY]['clearValidate']()
    },
    checkConfigIsVisible({ value, key }) {
      if (key && value === undefined) {
        if (this.FormData[key]) return true
      } else if (value === undefined && key === undefined) {
        console.warn('Key and value field not detected, U can like this: { value, key } or { key }')
      } else {
        if (this.FormData[key] === value) return true
      }
      return false
    },
    verificationProps(rows = {}) {
      const { type, request, props = {}} = rows
      const notEmpty = props && Object.keys(props).length > 0
      if (type === 'address' || request === 'address') {
        const _props = Object.assign({ value: 'code', label: 'name', children: 'children' }, props ? props.props : {})
        if (props && notEmpty) return { ...props, ...{ props: _props }}
        return { props: _props }
      } else {
        return props
      }
    },
    async mutation(event, config, refs, index) {
      await this.$nextTick()
      this.$emit('update', { event, config })
      this.fixedPointClearValidate(config)
    },
    async executeStack() {
      if (this.Stack.length === 0) return
      const runner = this.Stack[Symbol.iterator]()
      for (const iterator of runner) {
        const { request, key, handle, type, props } = iterator
        try {
          if (this.DataMaps[key]) continue
          this.$set(this.Notes, key, true)
          if (type === 'address' || request === 'address') {
            this.$set(this.DataMaps, key, await this.getDistricts(props))
            this.$set(this.Notes, key, false)
          } else {
            const type = Object.prototype.toString.call(request)
            const req = type === '[object Function]' ? await request() : await request
            console.log(JSON.parse(JSON.stringify({ [key]: req })))
            this.$set(this.Notes, key, false)
            if (_.isFunction(handle)) {
              this.$set(this.DataMaps, key, handle(req))
            } else {
              const { data = [], code } = req
              if (code === 200) {
                this.$set(this.DataMaps, key, data)
              } else {
                console.log(`[${key} executeStack request fail]: code(${code}) is abnormal!`)
              }
            }
          }
        } catch (e) {
          this.$set(this.Notes, key, true)
          console.log(`[executeStack method]: ${e}`)
        }
      }
    },
    verify(openTips = false) {
      return new Promise((resolve, reject) => {
        try {
          if (this.$refs[this.UNIQUE_KEY]) {
            this.$refs[this.UNIQUE_KEY]['validate'](valid => {
              if (valid) {
                resolve(this.FormData)
              } else {
                // eslint-disable-next-line no-throw-literal
                throw '您需要将标星号的栏目填写完整后重新尝试'
              }
            })
          }
        } catch (e) {
          if (openTips) this.$message.error(e)
          reject(e)
        }
      })
    },
    async getDistricts(props) {
      const _OPT = async() => {
        try {
          const districts = await import(`@/components/FormKit/districts.json`)
          const origin = _.cloneDeep(districts.default)
          if (props && props.level) {
            origin.forEach(val => {
              if (props.level === 1) {
                delete val.children
              } else if (props.level === 2) {
                val.children.forEach(itx => {
                  delete itx.children
                })
              }
            })
          }
          return origin || []
        } catch (e) {
          console.log(`FormKit can not load address districts: ${e}`)
          return []
        }
      }
      return await _OPT()
    },
    reload(key) { this.UNIQUE_KEY = key || Number(new Date()) }
  }
}
</script>

<style lang="less" scoped>
.FormKit {
  .form-kit-row { flex-wrap: wrap }
  .item-hint {
    margin: 0;
    color: #888888;
    font-weight: 300;
    font-size: 12px;
    line-height: 24px;
  }
  .formKit-list-item {
    display: inline-block;
    width: 100%;
  }
  /deep/ .el-input-number {
    width: auto;
  }
  /deep/ .el-form-item {
    margin: 0;
    width: 100%;
  }
  /deep/ .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  /deep/ .el-form-item__error {
    position: relative;
  }
}
.form-label-auto /deep/ .el-form-item__label {
  width: auto !important;
}
.form-kit-auto ::v-deep .el-form-item__content {
  display: inline-block;
}
</style>

