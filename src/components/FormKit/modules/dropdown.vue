<script>
export default {
  name: 'Dropdown',
  model: { prop: 'value', event: 'change' },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { required: true },
    options: { type: Array, default: () => [] }
  },
  computed: {
    _value: {
      get() { return this.value || null },
      set(value) {
        this.$emit('change', value)
      }
    },
    color() {
      return this.$attrs['activeColor'] || '#128bed'
    },
    suffixIcon() {
      return this.$attrs['suffixIcon'] ? this.$attrs['suffixIcon'] : 'el-icon-arrow-down'
    },
    label() {
      try {
        if (Array.isArray(this.options) && this.options.length === 0) return this.$attrs.placeholder || '请选择'
        const cur = this._value === null ? {} : this.options.find(it => it[this.$attrs.valueKey || 'id'] === this._value)
        return cur[this.$attrs.labelKey || 'name'] || this.$attrs.placeholder || '请选择'
      } catch (e) {
        console.log(e)
        return this.$attrs.placeholder || '请选择'
      }
    }
  }
}
</script>

<template>
  <el-dropdown ref="dropdown" v-bind="$attrs" @command="value => _value = value">
    <span :class="{ 'active': _value }">
      {{ label }}
      <i :class="[suffixIcon]" class="el-icon--right"/>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="it in options"
        :disabled="it.disabled || false"
        :icon="it.icon"
        :key="it[$attrs.valueKey || 'id']"
        :command="it[$attrs.valueKey || 'id']">
        <div v-html="it[$attrs.labelKey || 'name']"/>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<style scoped lang="less">
.active { color: #1984f6 }
</style>
