<template>
  <div>
    <el-checkbox v-if="isShowAllCheck" :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange">全选</el-checkbox>
    <el-checkbox-group v-if="options.length > 0" :indeterminate="isIndeterminate" v-model="_value" :disabled="disabled">
      <el-checkbox
        v-for="(it, idx) in options"
        :label="it[$attrs.valueKey || 'id']"
        :key="idx"
        :style="$attrs.styles">
        {{ it[$attrs.labelKey || 'name'] }}
      </el-checkbox>
    </el-checkbox-group>
    <p v-else>未找到可用选项</p>
  </div>
</template>

<script>
export default {
  name: 'IntegratedFormCheckbox',
  model: { prop: 'value', event: 'change' },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { required: true },
    disabled: { type: Boolean, default: false },
    showAllCheck: { type: Boolean, default: false },
    options: { type: Array, default: () => [] }
  },
  data: () => ({ checkAll: false, isIndeterminate: true }),
  computed: {
    isShowAllCheck() {
      return this.options.length > 0 && this.showAllCheck
    },
    _value: {
      get() {
        this.checkIndeterminate(this.value)
        return this.value || []
      },
      set(value) {
        this.$emit('change', value)
        this.checkIndeterminate(value)
      }
    }
  },
  methods: {
    checkAllChange(val) {
      this._value = val ? [...this.options].map(it => it[this.$attrs.valueKey || 'id']) : []
      this.isIndeterminate = false
    },
    checkIndeterminate(value = []) {
      const COUNTS = Array.isArray(value) ? value.length : 0
      this.checkAll = COUNTS === this.options.length
      this.isIndeterminate = COUNTS > 0 && COUNTS < this.options.length
    }
  }
}
</script>
