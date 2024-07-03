<script>
export default {
  name: 'FormKitPopover',
  model: { prop: 'value', event: 'change' },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { required: true },
    rangeSeparator: { type: String, default: '-' },
    showClose: { type: Boolean, default: false },
    loading: { type: [Boolean, undefined], default: false },
    options: { type: [Array, undefined], default: () => [] }
  },
  computed: {
    _value: {
      get() { return this.value || null },
      set(value) {
        this.$emit('change', value)
      }
    },
    label() {
      try {
        if (Array.isArray(this.options) && this.options.length === 0) return this.$attrs.placeholder || '请选择'
        const value = () => {
          const panel = this.$refs.cascader ? this.$refs.cascader.getCheckedNodes() : []
          if (Array.isArray(panel) && panel.length > 0) {
            if (Array.isArray(this._value) && this._value.length >= 1) {
              return `${panel[0].label}+${this._value.length}`
            } else {
              return panel[0].label
            }
          } else return ''
          // return Array.isArray(value[0]) ? `${value[0].join(this.rangeSeparator)} +${this._value.length}` : value.join(this.rangeSeparator)
        }
        return value() || this.$attrs.placeholder || '请选择'
      } catch (e) {
        console.log(e)
        return this.$attrs.placeholder || '请选择'
      }
    }
  }
}
</script>

<template>
  <el-popover
    :disabled="loading"
    v-bind="$attrs.popover"
    trigger="click">
    <div>
      <el-empty v-if="options.length === 0" :image-size="60"/>
      <el-cascader-panel v-else ref="cascader" :options="options" v-bind="$attrs" v-model="_value" />
    </div>
    <span slot="reference" :class="{ 'active': _value }" class="cursor-pointer">
      <span v-if="loading" class="loading">
        正在加载 <i class="el-icon-loading" />
      </span>
      <template v-else>
        <span class="ellipsis">{{ label }}</span>
        <i v-if="value" class="el-icon-close el-icon--right" @click.stop="_value = null"/>
        <i v-else class="el-icon-arrow-down el-icon--right"/>
      </template>
    </span>
  </el-popover>
</template>

<style scoped lang="less">
.active { color: #128bed }
.loading { color: #ccc; user-select: none }
</style>
